import React, { ChangeEvent, Dispatch, SetStateAction, FormEvent } from "react";
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AutoSizedTextArea from './AutoSizedTextArea';


export default function NewPostForm(props: { setUrl: Dispatch<SetStateAction<string>>, setDescription: Dispatch<SetStateAction<string>>, formSubmit: (event: FormEvent<HTMLFormElement>) => void}) {

  return(
    <Form onSubmit={props.formSubmit}>
      <Form.Group controlId="formImageUrl">
        <Form.Label>Image URL:</Form.Label>
        <Form.Control type="url" className="bg-dark text-white" placeholder="Enter Image URL (use your favourite site to upload a custom picture)"
        onChange={(event: ChangeEvent<HTMLInputElement>) => props.setUrl(event.target.value)}></Form.Control>
        <Form.Text muted>You can use gifs too!</Form.Text>
      </Form.Group>

      <Form.Group controlId="formPostDescription">
        <Form.Label>Description:</Form.Label>
        <div className="mx-2">
          <AutoSizedTextArea onKeyDown={() => {} } 
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => props.setDescription(event.target.value)}
          />
        </div>
      </Form.Group> 
      <Button type="submit" variant="dark">
        Publish
      </Button>
    </Form>
  )
}