import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import AlertIcon from '@/components/icons/Alert';
import Layout from '@/components/layout';
import {
  Title, Text, Input, InputWrapper, Flex,
} from '@/components/styles';

const Second = ({
  handleChange, exist, valid, showMessage, next, loading, domain,
}) => (
  <Layout loading={loading} title="Great, now create your organization">
    <Text color="#666666" margin="32px 0 0 0">
      STEP 2 OF 3
    </Text>
    <Title size="18px" color="#ffffff" margin="5px 0 16px 0">
      Create organization URL
    </Title>
    <Text margin="0 0 24px 0">
      We’ll use this URL to customize invitations to join your organization.
      We also have other exciting plans in the works for it.
    </Text>
    <InputWrapper>
      <Input
        name="domain"
        onChange={handleChange}
        align="right"
        placeholder="Company"
        value={domain}
      />
      <Text
        transform="lowercase"
        weight="bold"
        color="#ffffff"
        margin="0 0 0 8px"
      >
        .girbil.com
      </Text>
    </InputWrapper>
    <Flex margin="16px 0 90px 0">
      {
        showMessage && (
          <Text size="12px">
            Your workspace URL can only contain lowercase letters,
            numbers and dashes (and must start with a letter or number).
          </Text>
        )
      }
      {
        exist && (
          <Fragment>
            <AlertIcon />
            <Text size="12px" margin="0 0 0 8px">
              That URL is
              <span className="danger"> unavailable</span>
              . Please choose another.
            </Text>
          </Fragment>
        )
      }
      {
        valid && (
          <Text>
            Good news! Your organization name is
            <span className="success"> available </span>
            as your Girbil URL.
            We’ve pre-filled it for you, but feel free to change it.
          </Text>
        )
      }
    </Flex>
    <button
      onClick={next}
      disabled={!valid}
      className="primary"
      type="button"
    >
      Continue
    </button>
  </Layout>
);

Second.propTypes = {
  handleChange: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  showMessage: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  exist: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  domain: PropTypes.string.isRequired,
};


export default Second;
