import { FC, useEffect, useState } from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack,
  Group,
  FormItem,
  Input,
  File,
  DateInput,
  Button,
  FormLayoutGroup,
  ChipsSelect,
  IconButton,
  Flex,
  Textarea,
  Subhead,
 } from '@vkontakte/vkui';
import { Icon20SendOutline, Icon24Document, Icon16DeleteOutline } from '@vkontakte/icons';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { addTicket, editTicket, getGroups, getTickets } from "../api/api";
import { useSnackbar } from '../SnackbarContext';
import { useDispatch, useSelector } from 'react-redux';
import type { Ticket } from '../interfaces';
import type { Media as TicketFormMedia } from '../interfaces/ticketForm';
import { AppDispatch, RootState, setTickets } from '../store';

export const New: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { openError } = useSnackbar();

  const params = useParams<'id'>();
  const dispatch = useDispatch<AppDispatch>();
  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const [ticket, setTicket] = useState<Ticket>();

  useEffect(() => {
    if (params && params.id) {
      const existingTicket = tickets.find(t => t.id === params.id!);
      if (existingTicket) {
        setTicket(existingTicket);
      } else {
        getTickets().then((t) => {
          dispatch(setTickets(t));
          const foundTicket = t.find(t => t.id === params.id);
          if (foundTicket) {
            setTicket(foundTicket);
          } else {
            routeNavigator.push("/");
          }
        }).catch((err) => {
          routeNavigator.push("/");
          openError(err.response?.data || "Возникла ошибка")
        });
      }
    }
  }, []);

  const [groupsList, setGroupsList] = useState<string[][]>([]);
  useEffect(() => {
    getGroups().then((res) => {
      setGroupsList(res);
    });
  }, []);

  const [groupsOption, setGroupsOptions] = useState<{value: string, label: string}[]>([]);
  useEffect(() => {
    if (groupsList.length < 2) return;
    setGroupsOptions([
      ...groupsList[0].map(g => ({ value: g, label: g })),
      ...groupsList[1].map(g => ({ value: g, label: g })),
    ]);
  }, [groupsList]);

  const [selectedGroups, setSelectedGroups] = useState<{value: string, label: string}[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<TicketFormMedia[]>([]);
  const [date, setDate] = useState<Date>(() => new Date());
  const [isSend, setIsSend] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!ticket) return;

    setTitle(ticket.title || "");
    setDescription(ticket.description || "");
    setDate(ticket.time ? new Date(ticket.time * 1000) : new Date());
    setImages(ticket.media || []);

    if (groupsOption.length > 0 && ticket.groups.length > 0) {
      const res: {value: string, label: string}[] = [];
      groupsOption.forEach(g => {
        if (ticket.groups.includes(g.value)) {
          res.push(g);
        }
      });
      setSelectedGroups(res);
    }
  }, [ticket, groupsOption]);

  useEffect(() => {
    setIsDisabled(!title || !description);
  }, [title, description]);

  const isStatus = (val: string): "default" | "valid" | "error" => {
    if (!isSend) return "default";
    return val ? 'valid' : 'error'
  }

  const handleImages = (newFiles: FileList | null) => {
    // const types = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (newFiles) {
      const t = Array.from(newFiles).map(f => ({data: f, name: f.name}));
      setImages(prevFiles => [...prevFiles, ...t]);
    }
  }

  const deleteImage = (index: number) => {
    setImages(prevFiles => prevFiles.filter((_, i) => i !== index));
  }

  const readFiles = async (media: TicketFormMedia[]): Promise<TicketFormMedia[]> => {
    const readFile = (media: TicketFormMedia): Promise<TicketFormMedia> => new Promise((resolve, reject) => {
      if (!media.index) {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            data: reader.result as ArrayBuffer,
            name: media.name,
          });
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(media.data as File);
      } else {
        resolve(media);
      }
    });

    return Promise.all(media.map(readFile));
  };


  const sendForm = async () => {
    setIsSend(true);

    if (isDisabled) return;

    const fileBuffers = await readFiles(images);
    const data = {
      title,
      content: description,
      groups: selectedGroups.map(g => g.value),
      time: Math.floor(date.getTime() / 1000),
      media: fileBuffers,
    };
    console.log(data);


    if (!params?.id) {
      // новый
      addTicket(data).then(() => {
        routeNavigator.push('/');
      })
      .catch((err) => {
        openError(err.response?.data || "Возникла ошибка")
      });
    } else {
      // обновление
      editTicket(params.id, data).then(() => {
        routeNavigator.push('/');
      })
      .catch((err) => {
        openError(err.response?.data || "Возникла ошибка")
      });
    }
  }

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Новый тикет
      </PanelHeader>
      <Group>
        <FormItem
          top="Название тикета"
          status={isStatus(title)}
          required
        >
          <Input
            id="title"
            name="title"
            placeholder="Введите название тикета"
            value={title}
            required
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </FormItem>
        <FormItem
          top="Текст тикета"
          required
          bottom={(
            <Flex direction='column' gap={4}>
              <span>*Жирный* — <b>Текст</b></span>
              <span>_Курсивный_ — <i>Текст</i></span>
              <span>__Подчеркнутый__ — <u>Текст</u></span>
              <span>~Зачеркнутый~ — <s>Текст</s></span>
              <span>||Скрытый||</span>
              <span>`Моноширный`</span>
              <span>&gt; Цитата</span>
            </Flex>
          )}
          >
          <Textarea
            id="description"
            name="description"
            placeholder="Напишите текст тикета"
            value={description}
            required
            maxHeight={300}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </FormItem>
        <FormLayoutGroup mode="horizontal">
          <FormItem
            top="Загрузите документы"
          >
            <File
              before={
                <Icon24Document role="presentation" />
              }
              size="m"
              id="image"
              onChange={(e) => handleImages(e.currentTarget?.files)}
              multiple
            />
              {images.map((file, i) => (
                <Flex key={i} align='center' gap={10}>
                  <Subhead>{file.name}</Subhead>
                  <IconButton
                    label="Удалить файл"
                    style={{ width: 30, height: 30 }}
                    onClick={() => deleteImage(i)}
                  >
                    <Icon16DeleteOutline style={{ padding: 3, margin: "auto" }} color='red' />
                  </IconButton>
                </Flex>
              ))}
            {/* {images.length > 0 &&
              <Flex gap={7} style={{ marginTop: 10 }}>
                {images.map((image, i) => (
                  <Image src={URL.createObjectURL(image)} size={60} key={i}>
                    <Image.Overlay onClick={() => deleteImage(i)}>
                      <Icon20DeleteOutline width={28} height={28} />
                    </Image.Overlay>
                  </Image>
                ))}
              </Flex>
            } */}
          </FormItem>
        </FormLayoutGroup>
        <FormLayoutGroup mode="horizontal">
           <FormItem
            top="Группы"
            required
          >
            <ChipsSelect
              placeholder="Не выбраны"
              options={groupsOption}
              value={selectedGroups}
              onChange={setSelectedGroups}
              closeAfterSelect={false}
            />
          </FormItem>
          <FormItem top="Выставите дату и время публикации" required>
            <DateInput
              disablePast enableTime closeOnChange
              value={date}
              onChange={(e) => e && setDate(e)}
            />
          </FormItem>
        </FormLayoutGroup>

        <FormItem>
          <Button
            onClick={sendForm}
            before={<Icon20SendOutline />}
            size="m"
            stretched
            disabled={isDisabled}
          >
            Отправить на проверку / публикацию
          </Button>
        </FormItem>
      </Group>
    </Panel>
  );
};

export default New;