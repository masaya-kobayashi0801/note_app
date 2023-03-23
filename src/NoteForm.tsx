// import { TextArea } from "@douyinfe/semi-ui";
// import { useNavigate } from "@tanstack/react-location";
import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (props: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) => {
  //タイトルのテキストインプットの値を取得する
  const titleRef = useRef<HTMLInputElement>(null);
  // ボディのテキストエリアの値を取得する
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  // const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    // preventDefaultを調査する
    e.preventDefault();

    onSubmit({
      // !.　再度調査行う
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    // navigate("..");
  };

  // function uuidv4() {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Stack gap={1}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control ref={titleRef} required defaultValue={title} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tag">
                <Form.Label>Tag</Form.Label>
                <CreatableReactSelect
                  onCreateOption={(label) => {
                    const newTag = { id: uuidV4(), label };
                    onAddTag(newTag);
                    setSelectedTags((prev) => [...prev, newTag]);
                  }}
                  // 更新された値を設置する
                  value={selectedTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  options={availableTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  // 調査
                  // setSelectedTagsで値を更新する
                  onChange={(tags) => {
                    setSelectedTags(
                      tags.map((tag) => {
                        return { label: tag.label, id: tag.value };
                      })
                    );
                  }}
                  isMulti
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="markdown">
            <Form.Label>body</Form.Label>
            <Form.Control
              ref={markdownRef}
              defaultValue={markdown}
              required
              as="textarea"
              rows={15}
            />
          </Form.Group>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Link to="..">
              <Button type="button" variant="outline-secondary">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </>
  );
};
