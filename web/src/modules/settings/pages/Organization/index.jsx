import React, { Fragment, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import Layout from '@/components/layout';
import { query } from '@shared/graphql/organizations';
import { get } from '@shared/lib';
import { useOrg } from '../../hooks';
import PageButton from '../../PageButton';
import EditName from './EditName';
import EditDomain from './EditDomain';

const OrgSetting = () => {
  const org = useOrg();
  const { data } = useQuery(query.GET_ORGANIZATION, {
    variables: { organizationId: org.id },
  });
  const [details, setName] = useState({ name: '', domain: '' });
  const [editDomain, setEditDomain] = useState(false);
  const { domain, name } = get(data, 'organization', { domain: '', name: '' });

  useEffect(() => {
    setName({ name, domain });
  }, [name, domain]);

  return (
    <Layout title={editDomain ? 'Edit organization URL' : 'Organization settings'}>
      <Fragment>
        {
          !editDomain && (
            <EditName
              name={details.name}
              handleNameChange={value => setName({ ...details, name: value })}
            />
          )
        }
        <EditDomain
          name={details.name}
          domain={details.domain}
          handleDomainChange={value => setName({ ...details, domain: value })}
          onEditClicked={setEditDomain}
          editDomain={editDomain}
        />
        <PageButton
          action={() => {}}
          actionText="Update"
        />
      </Fragment>
    </Layout>
  );
};

export default OrgSetting;
