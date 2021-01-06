import React, { forwardRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import * as S from './styles';

const Input = forwardRef((props, ref) => {
  const [onFocus, setOnFocus] = useState(false);

  const handleFocus = () => setOnFocus(true);
  const handleBlur = () => setOnFocus(false);

  return (
    <S.Container onFocus={onFocus}>
      <Icon
        name={props.icon}
        size={20}
        color={onFocus ? '#ff9000' : '#666360'}
      />
      <S.Input
        ref={ref}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </S.Container>
  );
});

export default Input;

// const Input = ({ name, icon, control, onChange, ...rest }) => {
//   return (
//     <S.Container>
//       <Icon name={icon} size={20} color="#666360" />
//       <Controller
//         defaultValue=""
//         name={name}
//         control={control}
//         render={({ onChange, value }) => (
//           <S.Input
//             onChangeText={onChange}
//             value={value}
//             keyboardAppearance="dark"
//             placeholderTextColor="#666360"
//             {...rest}
//           />
//         )}
//       />
//     </S.Container>
//   );
// };
