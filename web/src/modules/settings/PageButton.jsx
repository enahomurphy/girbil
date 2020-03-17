import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@/components/styles';
import styled from 'styled-components';

const PageButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 24px;
  right: 24px;
`;

const PageButton = ({
  close, action, actionText, closeText, danger, disabled,
}) => (
  <PageButtonWrapper>
    { Boolean(closeText) && (
      <Button
        width="156px"
        margin="0 20px 0 0"
        onClick={close}
        type="button"
        className="inverse"
        align="right"
      >
        {closeText}
      </Button>
    )}
    { actionText && (
      <Button
        onClick={action}
        width="152px"
        type="button"
        disabled={disabled}
        className={danger ? 'red' : 'green'}
      >
        {actionText}
      </Button>
    )}
  </PageButtonWrapper>
);

PageButton.defaultProps = {
  danger: false,
  close: () => {},
  closeText: '',
  disabled: false,
};

PageButton.propTypes = {
  close: PropTypes.func,
  closeText: PropTypes.string,
  action: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default PageButton;
