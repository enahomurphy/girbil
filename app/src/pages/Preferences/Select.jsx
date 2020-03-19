import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useClickAway } from 'react-use';

import styled from 'styled-components';

import { Title, BorderedInput } from '@/components/Style';
import Chevron from '@/components/Icon/Chevron';

const Options = styled.div`
  background: #333333;
  box-shadow: 0px 4px 20px #222222;
  border-radius: 5px;
  margin-top: 8px;
  width: 100%;
  position: absolute;
`;

const Option = styled.div`
  font: normal 14px/14px Source Sans Pro;
  color: var(--gb-light-grey);
  height: 32px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  background: ${(props) => (props.selected ? 'var(--gb-accent)' : '#333333')};
  border-radius: 5px;

  &:hover {
    background: #0A84FF;
    border-radius: 5px;
  }
`;

const DropDown = styled(BorderedInput)`
  position: relative;
  z-index: ${(props) => (props.show ? 2 : 'initial')};
`;

const Icon = styled.span`
  transform: ${(props) => (props.show ? 'rotate(180deg)' : 'rotate(0deg)')};
  position: absolute;
  right: 12px;
  top: ${(props) => (props.show ? '57%' : '50%')};
`;

const Select = ({
  options, title, onChange, value,
}) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({});
  const ref = useRef(null);

  useClickAway(ref, () => {
    setShow(false);
  });

  useEffect(() => {
    if (options.length && !value) {
      setSelected(options[0]);
    }

    if (value && value.label) {
      setSelected(value);
    }
  }, [options, value]);

  const handleOptionClick = (option) => () => {
    setSelected(option);
    setShow(false);
    onChange(option);
  };

  return (
    <DropDown show={show}>
      <Title transform="capitalize">{title}</Title>
      <Icon onClick={() => setShow(!show)} show={show}>
        <Chevron />
      </Icon>
      <div className="input">
        <input
          onFocus={() => setShow(true)}
          value={selected.label || ''}
          placeholder="e.g., introductions"
          onChange={() => {}}
        />
      </div>
      {
        show && (
          <Options ref={ref}>
            {
              options.map((option) => (
                <Option
                  key={option.label}
                  selected={option.label === selected.label}
                  onClick={handleOptionClick(option)}
                >
                  {option.label}
                </Option>
              ))
            }
          </Options>
        )
      }
    </DropDown>
  );
};

Select.defaultProps = {
  onChange: () => {},
  value: null,
};

Select.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.object,
};

export default Select;
