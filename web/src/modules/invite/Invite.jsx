/* eslint-disable react/forbid-prop-types */
import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import LinkIcon from '@/components/icons/Link';
import Layout from '@/components/layout';
import { isEmail } from '@shared/lib';
import {
  Title, Text, Input, Form, Flex, InputWithError,
} from '@/components/styles';

const Invite = ({
  loading, organizationName, handleSendInvites, skip,
}) => {
  const [emails, setEmails] = useState(['']);
  const isValid = emails.every(isEmail);
  const addEmail = () => setEmails([...emails, '']);

  const handleChange = index => (event) => {
    const emailsToUpdate = [...emails];
    emailsToUpdate[index] = event.target.value;
    setEmails(emailsToUpdate);
  };

  return (
    <Layout loading={loading} title="Great, now create your organization">
      <Fragment>
        <Text color="#666666" margin="32px 0 0 0">
          STEP 3 OF 3
        </Text>
        <Title size="18px" color="#ffffff" margin="5px 0 16px 0">
          Invite people to
          {organizationName}
        </Title>
        <Text margin="0 0 24px 0">
          Girbil is more valuable with friends
          <span role="img" aria-label="lohappyve"> 🤗</span>
        </Text>
        <Form>
          {
          emails.map((email, index) => (
            <InputWithError>
              <Input
                align="left"
                transform="capitalize"
                placeholder="email"
                index={index}
                value={email}
                onChange={handleChange(index)}
              />
              {
                Boolean(!isEmail(email) && email.length) && (
                  <span>invalid email</span>
                )
              }
            </InputWithError>
          ))
        }
        </Form>
        <Flex cursor margin="0 0 48px 0">
          <LinkIcon />
          <Text
            cursor
            margin="0 0 0 8px"
            color="#fffff"
            onClick={addEmail}
          >
            Share invite link
          </Text>
        </Flex>
        <button
          onClick={handleSendInvites(emails)}
          disabled={!isValid}
          className="primary"
          type="button"
        >
          Invite
        </button>
        <button
          onClick={skip}
          style={{ marginTop: '15px' }}
          className="transparent"
          type="button"
        >
          Skip
        </button>
      </Fragment>
    </Layout>
  );
};

Invite.propTypes = {
  loading: PropTypes.bool.isRequired,
  organizationName: PropTypes.string.isRequired,
  handleSendInvites: PropTypes.func.isRequired,
  skip: PropTypes.func.isRequired,
};

export default Invite;
