import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import AlertIcon from '@/components/icons/Alert';
import {
  Text, Input, InputWrapper, Flex, Title,
} from '@/components/styles';

const EditDomain = ({
  editDomain, domain, handleDomainChange, onEditClicked,
}) => (
  <Fragment>
    {
      !editDomain && (
        <Flex justify="space-between" align="flex-end">
          <div>
            <Text
              margin="0 0 8px 0"
              color="var(--gb-web-grey-medium)"
              weight="bold"
              transform="uppercase"
            >
              url
            </Text>
            <Title>{`${domain}.girbil.com`}</Title>
          </div>
          <Text
            weight="600"
            color="var(--gb-web-blue)"
            transform="uppercase"
            cursor="pointer"
            onClick={() => onEditClicked(!editDomain)}
          >
            Edit
          </Text>
        </Flex>
      )
    }
    {
      editDomain && (
        <Fragment>
          <Text margin="16px 0 24px 0">
            We’ll use this URL to customize invitations to join your organization.
            We also have other exciting plans in the works for it.
          </Text>
          <InputWrapper>
            <Input
              name="domain"
              onChange={({ target }) => handleDomainChange(target.value)}
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
        </Fragment>
      )
    }
  </Fragment>
);

EditDomain.propTypes = {
  handleDomainChange: PropTypes.func.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  domain: PropTypes.string.isRequired,
  editDomain: PropTypes.bool.isRequired,
};


export default EditDomain;
