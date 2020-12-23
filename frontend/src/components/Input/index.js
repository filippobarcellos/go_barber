import { useState, forwardRef } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import * as S from './styles';

const Input = forwardRef((props, ref) => {
  const { icon: Icon, type, placeholder, name, error } = props;

  const [isFocused, setIsFocused] = useState(false);

  return (
    <S.Container
      isFocused={isFocused}
      error={error}
      style={props.containerStyle}
    >
      {Icon && <Icon size={20} />}
      <S.Input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        name={name}
        type={type}
        placeholder={placeholder}
        ref={ref}
      />
      {error && (
        <S.Error text={error.message}>
          <FiAlertCircle size={20} />
        </S.Error>
      )}
    </S.Container>
  );
});

export default Input;
