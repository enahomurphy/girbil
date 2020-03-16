import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '@/components/layout';
import { Text, Title, Flex } from '@/components/styles';
import PageButton from '../../PageButton';
import EditName from './EditName';

const OrgSetting = () => {
  const { push } = useHistory();

  return (
    <Layout title="Organization settings">
      <Fragment>
        <EditName />
        <Flex justify="space-between" align="flex-end">
          <div>
            <Text
              margin="0 0 8px 0"
              color="var(--gb-web-grey-medium)"
              weight="bold"
              transform="uppercase"
            >
              weave.unbird.com
            </Text>
            <Title>Weave</Title>
          </div>
          <Text
            weight="600"
            color="var(--gb-web-blue)"
            transform="uppercase"
            cursor="pointer"
            onClick={() => push('/organizations/settings/domain')}
          >
            Edit
          </Text>
        </Flex>

        <PageButton
          action={() => {}}
          actionText="Update"
        />
      </Fragment>
    </Layout>
  );
};

export default OrgSetting;
