import { FC, useState } from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack,
  Group,
  FormItem,
  Input,
  File,
  DateInput,
  Button,
  FormLayoutGroup,
  ChipsInput,
  IconButton,
  Flex,
  Textarea,
  Subhead,
 } from '@vkontakte/vkui';
import { Icon20SendOutline, Icon16Clear, Icon24Document, Icon16DeleteOutline } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { addTicket } from "../api/api";

export const New: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [groups, setGroups] = useState<{value: string, label: string}[]>([]);
  const [date, setDate] = useState<Date>(() => new Date());
  const [isSend, setIsSend] = useState(false);

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

    if (!title || !description || groups.length == 0) return;

    const fileBuffers = await readFiles(images);
    const data = {
      title,
      content: description,
      groups: groups.map(t => t.value),
      time: Math.floor(date.getTime() / 1000),
      media: fileBuffers,
    };
    console.log(data);

    addTicket(data).then(() => {
      routeNavigator.push('/');
    });
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
          <FormItem top="Теги (введите и нажмите enter)" required>
            <ChipsInput
              id="groups"
              placeholder="Введите теги"
              after={groups.length > 0 &&
                <IconButton hoverMode="opacity" label="Очистить поле" onClick={() => setGroups([])}>
                  <Icon16Clear />
                </IconButton>
              }
              value={groups}
              onChange={(e) => setGroups(e)}
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
          >
            Отправить на проверку / публикацию
          </Button>
        </FormItem>
      </Group>
    </Panel>
  );
};
