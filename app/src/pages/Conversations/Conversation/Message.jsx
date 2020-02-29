import React from 'react';
import { Page } from 'framework7-react';
import { useQuery } from '@apollo/react-hooks';

import { query } from '@/lib/graphql/conversations';
import Video from '@/components/Video/Video';

const Message = () => {
  const { data } = useQuery(query.MESSAGE);

  return (
    <Page>
      <Video message={data.message} id="video" />
    </Page>
  );
};

Message.propTypes = {

};

export default Message;
