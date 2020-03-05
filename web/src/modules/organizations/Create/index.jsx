import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { useDebounce } from 'react-use';
import { useToasts } from 'react-toast-notifications';

import { mutation, query } from '@shared/graphql/organizations';
import { get, storage } from '@shared/lib';

import First from './Steps/First';
import Second from './Steps/Second';

const Create = () => {
  const { push } = useHistory();
  const { addToast } = useToasts();
  const [org, set] = useState({ name: '', domain: '' });
  const [domain, setDenouncedDomain] = useState('');
  const [addOrg, { loading }] = useMutation(mutation.ADD_ORGANIZATION);
  const [getOrg, { data, loading: loadingOrg }] = useLazyQuery(query.GET_ORGANIZATION_BY_DOMAIN);
  const [step, setStep] = useState(1);

  const organization = get(data, 'organizationByDomain', null);

  useDebounce(
    () => {
      if (step === 2) {
        setDenouncedDomain(org.domain);
        getOrg({ variables: { domain: org.domain } });
      }
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
      const { data: newOrg } = await addOrg({ variables: org });
      const token = get(newOrg, 'addOrganization.token', null);
      storage.setToken(token);
      push('/organizations/invite');
    } catch (_) {
      addToast('Unable to create organization, try again or contact admin@girbil.com', {
        appearance: 'error',
      });
    }
  };

  const next = async () => {
    if (step === 1) {
      setStep(step + 1);
      set({ ...org, domain: org.name });
    }

    if (step === 2) {
      createOrganization();
    }
  };

  switch (step) {
    case 1:
      return <First handleChange={handleChange} next={next} />;
    case 2:
      return (
        <Second
          loading={loading}
          handleChange={handleChange}
          valid={!organization && !loadingOrg && Boolean(domain.length)}
          exist={Boolean(organization)}
          showMessage={!org.domain.length}
          next={next}
          domain={domain}
        />
      );
    default:
      return null;
  }
};

export default Create;
