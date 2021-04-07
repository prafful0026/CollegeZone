import React from "react";
import {
  Button,
  Message,
  Form,
  Segment,
  TextArea,
  Divider,
} from "semantic-ui-react";

const InputComponent = ({user:{bio,facebook,twitter,youtube,instagram},
  showSociaLinks,
  setShowSociaLinks,
  handleChange}) => {
  return (
    <>
      <Form.Field
        required
        control={TextArea}
        name='bio'
        value={bio}
        onChange={handleChange}
        placeholder='bio'
      />
      <Button
        content='Add Social Links'
        color='red'
        icon='at'
        type='button'
        onClick={() => {
          setShowSociaLinks(!showSociaLinks);
        }}
      />
      {showSociaLinks && (
        <>
          <Divider />
          <Form.Input
            icon='facebook messenger'
            iconPosition='left'
            name='facebook'
            value={facebook}
            onChange={handleChange}
          ></Form.Input>
           <Form.Input
            icon='twitter '  
            iconPosition='left'
            name='twitter'
            value={twitter}
            onChange={handleChange}
          ></Form.Input>
           <Form.Input
            icon='user '
            iconPosition='left'
            name='instagram'
            value={instagram}
            onChange={handleChange}
          ></Form.Input>
           <Form.Input
            icon='youtube '
            iconPosition='left'
            name='youtube'
            value={youtube}
            onChange={handleChange}
          ></Form.Input>
          <Message icon="attention" info size="small" header="Social media links are optional"></Message>
        </>
      )}
    </>
  );
};

export default InputComponent;
