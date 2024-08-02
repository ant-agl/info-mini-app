import { FC, useState } from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack,
  Div,
  Group,
  FormItem,
  Input,
  File,
  DateInput,
  Button,
  FormLayoutGroup,
  ChipsInput,
  IconButton,
  Image,
  Subhead,
  Flex,
  Textarea,
 } from '@vkontakte/vkui';
import { Icon24Camera, Icon24Document, Icon20SendOutline, Icon16Clear, Icon20DeleteOutline, Icon16DeleteOutline } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { addTicket } from "../api/api";

export const New: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<{value: string, label: string}[]>([]);
  const [date, setDate] = useState<Date>(() => new Date());
  const [isSend, setIsSend] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

  const isStatus = (val: string): "default" | "valid" | "error" => {
    if (!isSend) return "default";
    return val ? 'valid' : 'error'
  }

  const handleImages = (newFiles: FileList | null) => {
    const types = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    setIsImageError(false);
    let isError = false;

    if (newFiles) {
      for (let i = 0; i < newFiles?.length; i++) {
        if (!types.includes(newFiles[0].type)) isError = true;
      }
    }

    if (!newFiles || isError) {
      setIsImageError(true);
      return;
    }

    setIsImageError(false);
    setImages(prevFiles => [...prevFiles, ...Array.from(newFiles)]);
  }

  const deleteImage = (index: number) => {
    setImages(prevFiles => prevFiles.filter((_, i) => i !== index));
  }

  const handleFiles = (newFiles: FileList | null) => {
    if (newFiles)
      setFiles(prevFiles => [...prevFiles, ...Array.from(newFiles)]);
  }

  const deleteFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  }

  const sendForm = () => {
    setIsSend(true);

    if (!title || !description) return;

    const data = {
      title,
      content: description,
      groups: tags.map(t => t.value),
      time: Math.floor(date.getTime() / 1000),
      media: [],
      // images,
      // files,
    };
    console.log(data);

    addTicket(data).then(() => {
      // routeNavigator.push('/');
    });
  }

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Новый тикет
      </PanelHeader>
      <Div>
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
              top="Загрузите фото"
              status={!isImageError ? "default" : "error"}
              bottom="Фото должно быть в формате png, jpg, jpeg или webp"
            >
              <File
                before={
                  <Icon24Camera role="presentation" />
                }
                size="m"
                id="image"
                onChange={(e) => handleImages(e.currentTarget?.files)}
                multiple
              >
                Открыть галерею
              </File>
              {images.length > 0 &&
                <Flex gap={7} style={{ marginTop: 10 }}>
                  {images.map((image, i) => (
                    <Image src={URL.createObjectURL(image)} size={60} key={i}>
                      <Image.Overlay onClick={() => deleteImage(i)}>
                        <Icon20DeleteOutline width={28} height={28} />
                      </Image.Overlay>
                    </Image>
                  ))}
                </Flex>
              }
            </FormItem>
            <FormItem
              top="Загрузите документы (при необходимости)"
            >
              <File
                before={
                  <Icon24Document role="presentation" />
                }
                size="m" mode="secondary"
                multiple
                onChange={(e) => handleFiles(e.currentTarget?.files)}
              />
              {files.map((file, i) => (
                <Flex key={i} align='center' gap={10}>
                  <Subhead>{file.name}</Subhead>
                  <IconButton
                    label="Удалить файл"
                    style={{ width: 30, height: 30 }}
                    onClick={() => deleteFile(i)}
                  >
                    <Icon16DeleteOutline style={{ padding: 3, margin: "auto" }} />
                  </IconButton>
                </Flex>
              ))}
            </FormItem>
          </FormLayoutGroup>
          <FormLayoutGroup mode="horizontal">
            <FormItem top="Теги (введите и нажмите enter)">
              <ChipsInput
                id="tags"
                placeholder="Введите теги"
                after={tags.length > 0 &&
                  <IconButton hoverMode="opacity" label="Очистить поле" onClick={() => setTags([])}>
                    <Icon16Clear />
                  </IconButton>
                }
                value={tags}
                onChange={(e) => setTags(e)}
              />
            </FormItem>
            <FormItem top="Выставите дату и время публикации">
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
      </Div>
    </Panel>
  );
};
