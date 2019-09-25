import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Formik, Field, FormikProps } from 'formik'
import { compose } from 'recompose'

import { login } from '@app/store/modules/auth/action'
import { MainLayout } from '@app/components/layout/main-layout'
import { LoginSchema } from '@app/helpers/validators/login-validator'
import { TextInput } from '@app/components/input-field/text-input'
import { LabelField } from '@app/components/label-field/label'
import { getRootAuthState, getAuthIsLoading, getAuthError } from '@app/store/modules/auth/selector'
import { withNoAuth } from '@app/components/hoc/withNoAuth'
import { LoginFormBody } from '@app/helpers/form-types/login-form-type'

class LoginPage extends React.Component<LoginPageProps> {
  render() {
    return (
      <MainLayout pageName="เข้าสู่ระบบ">
        <Formik
          initialValues={{}}
          validationSchema={LoginSchema}
          onSubmit={(values: LoginFormBody) => this.props.loginFunction(values.email, values.password)}
          render={(props: FormikProps<LoginFormBody>) => (
            <form onSubmit={props.handleSubmit}>
              <LabelField isRequired>Username</LabelField>
              <Field
                name="email"
                component={TextInput}
                value={props.values.email}
                onChange={props.handleChange}
                placeholder="email"
              />

              <LabelField isRequired>Password</LabelField>
              <Field
                name="password"
                component={TextInput}
                value={props.values.password}
                onChange={props.handleChange}
                type="password"
                placeholder="password"
              />

              <SubmitContainer>
                <SubbmitButton type="primary" htmlType="submit" loading={this.props.isAuthLoading}>
                  เข้าสู่ระบบ
                </SubbmitButton>
              </SubmitContainer>
              <ErrorLogin>{this.props.authError['login']}</ErrorLogin>
            </form>
          )}
        />
      </MainLayout>
    )
  }
}

type LoginPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = state => {
  const authRootState = getRootAuthState(state)
  const isAuthLoading = getAuthIsLoading(authRootState)
  const authError = getAuthError(authRootState)
  return {
    isAuthLoading,
    authError,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginFunction: (email, password) => dispatch(login(email, password)),
  }
}

export default compose(
  withNoAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(LoginPage)

const SubmitContainer = styled.div`
  padding-top: 60px;
`

const SubbmitButton = styled(Button)`
  &.ant-btn-primary {
    width: 100%;
    height: 60px;
    background-color: #20344b;
    color: #ffffff;
    font-size: 20px;

    border-radius: 4px;

    &:hover,
    :active,
    :focus {
      background-color: #20344b;
    }
  }
`

const ErrorLogin = styled.label`
  font-size: 20px;
  color: red;
`
