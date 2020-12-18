import * as S from './styles';

function Tooltip({ text, children, className }) {
  return (
    <S.Container className={className}>
      {children}
      <span>{text}</span>
    </S.Container>
  );
}

export default Tooltip;
