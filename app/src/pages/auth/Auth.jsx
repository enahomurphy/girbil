import React, { useState } from 'react';
import { Page, List } from 'framework7-react';
import PropTypes from 'prop-types';

import {
  Title, Button, Block,
} from '@/pages/style';
import {
  StyledForm, StyledListInput, StyledLink, AuthWrapper,
} from './style';

const Auth = ({
  forms, onSubmit, buttonText, title, meta,
}) => {
  const [user, setUser] = useState(forms.reduce((acc, { name }) => {
    (acc[name] = '');
    return acc;
  }, {}));

  const submit = () => onSubmit(user);

  return (
    <Page noToolbar noNavbar noSwipeback>
      <AuthWrapper>
        <StyledForm>
          <Title>{title}</Title>
          <List style={{ minWidth: '300px', width: '300px', margin: '0px auto' }} form>
            {
              forms.map(({
                type, name, label, placeholder,
              }) => (
                <StyledListInput
                  key={name}
                  label={label}
                  floatingLabel
                  type={type}
                  placeholder={placeholder}
                  value={user[name]}
                  onInput={(e) => {
                    setUser({ ...user, [name]: e.target.value });
                  }}
                />
              ))
            }
          </List>
        </StyledForm>
        <Block
          margin="32px 0 10px 0"
          type="flex"
          justify="center"
        >
          <Button
            margin="0"
            borderColor="white"
            width="300px"
            colorTheme="white"
            onClick={submit}
          >
            {buttonText}
          </Button>
        </Block>

        <StyledLink href={meta.path}>
          {meta.name}
        </StyledLink>
      </AuthWrapper>
    </Page>
  );
};

Auth.propTypes = {
  forms: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Auth;
