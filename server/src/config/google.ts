export const googleCredential = {
  type: process.env.gcloud_type,
  project_id: process.env.gcloud_project_id,
  private_key_id: process.env.gcloud_private_key_id,
  private_key: process.env.gcloud_private_key.replace(/\\n/g, '\n'),
  client_email: process.env.gcloud_client_email,
  client_id: process.env.gcloud_client_id,
  auth_uri: process.env.gcloud_auth_uri,
  token_uri: process.env.gcloud_token_uri,
  auth_provider_x509_cert_url: process.env.gcloud_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.gcloud_client_x509_cert_url,
} as any
