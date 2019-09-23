import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Formik, Field } from 'formik'
import { compose } from 'recompose'

import { login } from '@app/store/modules/auth/action'
import { MainLayout } from '@app/components/layout/main-layout'
import { LoginSchema } from '@app/helpers/validators/login-validator'
import { TextInput } from '@app/components/input-field/text-input'
import { LabelField } from '@app/components/label-field/label'
import { getRootAuthState, getAuthIsLoading } from '@app/store/modules/auth/selector'
import { withNoAuth } from '@app/components/hoc/withNoAuth'

interface LoginFormProps {
  email: string
  password: string
}

class HomePage extends React.Component<LoginPageProps> {
  render() {
    const { loginFunction } = this.props
    return (
      <MainLayout>
        <Formik
          initialValues={{}}
          validationSchema={LoginSchema}
          onSubmit={(values: LoginFormProps) => loginFunction(values.email, values.password)}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <LabelField isRequired>Username</LabelField>
              <Field
                name="email"
                component={TextInput}
                value={props.values['email']}
                onChange={props.handleChange}
                placeholder="email"
              />

              <LabelField isRequired>Password</LabelField>
              <Field
                name="password"
                component={TextInput}
                value={props.values['password']}
                onChange={props.handleChange}
                type="password"
                placeholder="password"
              />

              <SubmitContainer>
                <SubbmitButton type="primary" htmlType="submit" loading={this.props.isAuthLoading}>
                  เข้าสู่ระบบ
                </SubbmitButton>
              </SubmitContainer>
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
  return {
    isAuthLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginFunction: (email, password) => dispatch(login(email, password)),
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withNoAuth,
)(HomePage)

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
