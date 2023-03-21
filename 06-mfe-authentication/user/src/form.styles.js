import styled from "styled-components";

import { PText } from 'ui-components';

export const FormContainer = styled.form`
  width: 50%;
  background: ${({ theme }) => theme.colors.neutral[100]};
  padding: ${({ theme }) => `${theme.gridSize * 2}px ${theme.gridSize * 3}px`};
  border: ${({ theme }) => `1px solid ${theme.colors.neutral[200]}`};
  border-radius: 8px;
  margin: 10% auto 0;
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => `${theme.gridSize * 2}px`};
`;

export const SignUp = styled(PText)`
  margin-bottom: ${({ theme }) => `${theme.gridSize}px`};
  float: right;
`;
