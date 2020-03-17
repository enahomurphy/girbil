import React, { Fragment, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';

import Layout from '@/components/layout';
import { query, mutation } from '@shared/graphql/organizations';
import { get } from '@shared/lib';
import { useOrg } from '../../hooks';
import PageButton from '../../PageButton';
import EditName from './EditName';
import EditDomain from './EditDomain';

const OrgSetting = () => {
  const org = useOrg();
  const { addToast } = useToasts();
  const { data } = useQuery(query.GET_ORGANIZATION, {
    variables: { organizationId: org.id },
  });
  const [updateOrg, { loading }] = useMutation(mutation.UPDATE_ORGANIZATION);
  const [details, setName] = useState({ name: '', domain: '' });
  const [editState, setEditState] = useState(null);
  const { domain, name } = get(data, 'organization', { domain: '', name: '' });

  useEffect(() => {
    setName({ name, domain });
  }, [name, domain]);

  const handleUpdate = async () => {
    try {
      await updateOrg({
        variables: details,
        update: (store, { data: { updateOrganization } }) => {
          store.writeQuery({
            query: query.GET_ORGANIZATION,
            variables: { organizationId: org.id },
            data: updateOrganization,
          });

          setEditState(null);
        },
      });
    } catch (error) {
      if (error.graphQLErrors) {
        const { message } = error.graphQLErrors[0];
        addToast(message, { appearance: 'error' });
      }
    }
  };

  const disabled = (details.name === name) && (details.domain === domain);

  return (
    <Layout
      loading={loading}
      backAction={editState === 'domain' ? () => setEditState(null) : null}
      title={editState === 'domain' ? 'Edit organization URL' : 'Organization settings'}
    >
      <Fragment>
        {
          editState !== 'domain' && (
            <EditName
              name={details.name}
              handleNameChange={value => setName({ ...details, name: value })}
              onEditClicked={() => setEditState('name')}
              editName={editState === 'name'}
            />
          )
        }
        <EditDomain
          name={details.name}
          domain={details.domain}
          handleDomainChange={value => setName({ ...details, domain: value })}
          onEditClicked={() => setEditState('domain')}
          editDomain={editState === 'domain'}
        />
        <PageButton
          action={handleUpdate}
          actionText="Update"
          disabled={disabled}
        />
      </Fragment>
    </Layout>
  );
};

export default OrgSetting;
