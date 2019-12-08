import React, { useState } from "react";
import { Button, InputGroup, InputGroupAddon, Input, Form } from "reactstrap";

const SearchBox = ({ onSearch }) => {
  const [keywords, setKeywords] = useState("");

  const handleChange = e => {
    setKeywords(e.target.value);
  };

  const handleClick = () => {
    onSearch(keywords);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(keywords);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <Button type="button" color="primary" onClick={handleClick}>
            <i className="fa fa-search"></i> Search
          </Button>
        </InputGroupAddon>
        <Input type="text" placeholder="Keywords..." onChange={handleChange} />
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
