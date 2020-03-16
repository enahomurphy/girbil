import React, { useState, Fragment } from 'react';
import { useDebounce } from 'react-use';
import { useToasts } from 'react-toast-notifications';

import AlertIcon from '@/components/icons/Alert';
import {
  Text, Input, InputWrapper, Flex,
} from '@/components/styles';
import Layout from '@/components/layout/index';
import PageButton from '../../PageButton';

const Create = () => {
  const { addToast } = useToasts();
  const [org, set] = useState({ name: '', domain: '' });
  const [domain, setDenouncedDomain] = useState('');

  useDebounce(
    () => {
      setDenouncedDomain(org.domain);
    },
    500,
    [org],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    set({ ...org, [name]: value });
  };

  const createOrganization = async () => {
    try {
      console.info('sasddd');
    } catch (_) {
      addToast('Unable to create organization, try again or contact admin@girbil.com', {
        appearance: 'error',
      });
    }
  };

  return (
    <Layout title="Edit organization URL">
      <Fragment>
        <Text margin="16px 0 24px 0">
          We’ll use this URL to customize invitations to join your organiztion.
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
          false && (
            <Text size="12px">
              Your workspace URL can only contain lowercase letters,
              numbers and dashes (and must start with a letter or number).
            </Text>
          )
        }
          {
          false && (
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
          true && (
            <Text>
              Good news! Your organization name is
              <span className="success"> available </span>
              as your Girbil URL.
              We’ve pre-filled it for you, but feel free to change it.
            </Text>
          )
        }
        </Flex>
        <PageButton
          action={createOrganization}
          actionText="Update"
        />
      </Fragment>
    </Layout>
  );
};


export default Create;
