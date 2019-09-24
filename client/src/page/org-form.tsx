import React from 'react'
import { Button } from 'antd'
import { Field, Formik } from 'formik'
import styled from 'styled-components'

import { MainLayout } from '@app/components/layout/main-layout'
import { OrganizationSchema } from '@app/helpers/validators/org-validator'
import { TextInput } from '@app/components/input-field/text-input'
import { SelectInput } from '@app/components/input-field/select-input'
import { LabelField } from '@app/components/label-field/label'
import { SubmitActionForm } from '@app/components/action-form/SubmitButton'
import { DeleteActionForm } from '@app/components/action-form/DeleteButton'
import { orgTypeData } from '@app/static/org-static'

class OrgPage extends React.Component<any> {
  render() {
    return (
      <MainLayout pageName="รายการบริษัท">
        <Formik
          //   initialValues={isEditingForm ? generateFormData(Item) : initialValues}
          initialValues={{}}
          enableReinitialize={true}
          validationSchema={OrganizationSchema}
          onSubmit={async (values, actions) => {
            // setisSubmiting(true)
            // if (isEditingForm && values._id) await Update(values)
            // else if (!isEditingForm) await Insert(values)
            // else alert(`Server refuse your request.`)
            // setisSubmiting(false)
            // goBack()
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <LabelField isRequired>ประเภทบริษัท</LabelField>
              <Field
                name="orgType"
                component={SelectInput}
                options={orgTypeData}
                value={props.values['orgType'] ? props.values['orgType'].label : ''}
                onChange={id => props.setFieldValue('orgType', orgTypeData.find(v => v.id === id))}
              />

              <LabelField isRequired>ชื่อบริษัท</LabelField>
              <Field name="orgName" component={TextInput} value={props.values['orgName']} onChange={props.handleChange} />

              <LabelField isRequired>ค่าคอมมิชชั่นสินค้า A</LabelField>
              <Field
                type="number"
                name="orgComA"
                component={TextInput}
                value={props.values['orgComA']}
                onChange={props.handleChange}
              />

              <LabelField>ค่าคอมมิชชั่นสินค้า B</LabelField>
              <Field
                type="number"
                name="orgComB"
                component={TextInput}
                value={props.values['orgComB']}
                onChange={props.handleChange}
              />

              <LabelField isRequired>รหัสบริษัท</LabelField>
              <Field
                label="รหัสบริษัท"
                name="orgCode"
                component={TextInput}
                value={props.values['orgCode']}
                onChange={props.handleChange}
              />

              <FormActionContainer>
                <DeleteActionForm title="ยืนยันการลบรายการนี้" onConfirm={() => console.log('test')} />
                <SubmitActionForm loading={false} />
              </FormActionContainer>
            </form>
          )}
        />
      </MainLayout>
    )
  }
}

export default OrgPage

const FormActionContainer = styled.div`
  display: flex;
`
