import React, { useState } from 'react';
import {
  Page,
  List,
} from 'framework7-react';
import {
  Title, Button, Block, Text,
} from '@/pages/style';
import { StyledForm, StyledListInput } from './style';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const signIn = () => {

  };

  return (
    <Page noToolbar noNavbar noSwipeback>
      <StyledForm>
        <Title>Login</Title>
        <List style={{ minWidth: '300px', width: '300px', margin: '0px auto' }} form>
          <StyledListInput
            label="Email"
            floatingLabel
            type="text"
            placeholder="Your email"
            value={user.email}
            onInput={(e) => {
              setUser({ email: e.target.value });
            }}
          />
          <StyledListInput
            label="Password"
            floatingLabel
            type="password"
            placeholder="Your password"
            value={user.password}
            onInput={(e) => {
              setUser({ password: e.target.value });
            }}
          />
        </List>
      </StyledForm>
      <Block
        margin="32px 0 20px 0"
        type="flex"
        justify="center"
      >
        <Button
          margin="0"
          borderColor="white"
          width="300px"
          colorTheme="white"
          onClick={signIn}
        >
          Sign In
        </Button>
      </Block>
      <Text align="right" width="300px">Forgot password?</Text>
    </Page>
  );
};

export default Login;
