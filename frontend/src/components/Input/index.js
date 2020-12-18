import { useState, forwardRef } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import * as S from './styles';

const Input = forwardRef((props, ref) => {
  const { icon: Icon, type, placeholder, name, error, isDirty } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFocus = () => {
    setIsFocused(false);
    setIsFilled(!!isDirty);
  };

  return (
    <S.Container isFocused={isFocused} isFilled={isFilled} error={error}>
      {Icon && <Icon size={20} />}
      <S.Input
        onFocus={() => setIsFocused(true)}
        onBlur={handleFocus}
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
