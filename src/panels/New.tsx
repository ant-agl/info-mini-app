import { FC, useEffect, useState } from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack,
  Group,
  FormItem,
  Input,
  File,
  DateInput,
  Button,
  FormLayoutGroup,
  Checkbox,
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
import { Ticket } from '../interfaces';
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
          openError(err.response.data || "Возникла ошибка")
        });
      }
    }
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [date, setDate] = useState<Date>(() => new Date());
  const [isSend, setIsSend] = useState(false);
  const [groups, setGroups] = useState<{value: boolean, label: string}[][]>([]);
  const [groupsVal, setGroupsVal] = useState<string[]>([]);
  const [groupsList, setGroupsList] = useState<string[][]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    getGroups().then((g) => {
      setGroupsList(g);
      setGroups(g.map(item => item.map(i => ({value: false, label: i}))));
    });
  }, []);

  useEffect(() => {
    if (groups[0] && groups[1])
      setGroupsVal([...groups[0].filter(g => g.value).map(g => g.label), ...groups[1].filter(g => g.value).map(g => g.label)]);
  }, [groups]);

  useEffect(() => {
    setTitle(ticket?.title || "");
    setDescription(ticket?.description || "");
    setDate(ticket?.time ? new Date(ticket.time * 1000) : new Date());

    if (groupsList.length > 0) {
      ticket?.groups.map(g => {
        const i = groupsList[0].findIndex(gl => gl == g);
        if (i !== -1) updateGroups(0, i, true);

        const j = groupsList[1].findIndex(gl => gl == g);
        if (j !== -1) updateGroups(1, j, true);
      });
    }
  }, [ticket, groupsList]);

  useEffect(() => {
    setIsDisabled(!title || !description || groupsVal.length == 0);
  }, [title, description, groupsVal]);

  const updateGroups = (i: number, j: number, val: boolean) => {
    const res = {...groups};
    res[i][j].value = val;
    setGroups(res);
  }

  const isStatus = (val: string): "default" | "valid" | "error" => {
    if (!isSend) return "default";
    return val ? 'valid' : 'error'
  }

  const handleImages = (newFiles: FileList | null) => {
    // const types = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (newFiles)
      setImages(prevFiles => [...prevFiles, ...Array.from(newFiles)]);
  }

  const deleteImage = (index: number) => {
    setImages(prevFiles => prevFiles.filter((_, i) => i !== index));
  }

  const readFiles = async (files: File[]): Promise<{ data: ArrayBuffer, name: string }[]> => {
    const readFile = (file: File): Promise<{ data: ArrayBuffer, name: string }> => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          data: reader.result as ArrayBuffer,
          name: file.name,
        });
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });

    return Promise.all(files.map(readFile));
  };

  const sendForm = async () => {
    setIsSend(true);

    if (isDisabled) return;

    const fileBuffers = await readFiles(images);
    const data = {
      title,
      content: description,
      groups: groupsVal,
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
        openError(err.response.data || "Возникла ошибка")
      });
    } else {
      // обновление
      editTicket(params.id, data).then(() => {
        routeNavigator.push('/');
      })
      .catch((err) => {
        openError(err.response.data || "Возникла ошибка")
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
            {groupsList[0]?.map((group, i) => (
              <Checkbox checked={groups[0][i].value} key={i} onChange={(e) => updateGroups(0, i, e.target.checked)}>{ group }</Checkbox>
            ))}
            {groupsList[1]?.map((group, i) => (
              <Checkbox checked={groups[1][i].value} description='На проверку' key={i} onChange={(e) => updateGroups(1, i, e.target.checked)}>{ group }</Checkbox>
            ))}
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