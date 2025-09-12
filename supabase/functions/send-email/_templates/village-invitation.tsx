import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface VillageInvitationEmailProps {
  invitedName: string
  inviterName: string
  inviterEmail: string
  role: string
  personalMessage: string
  signupUrl: string
}

export const VillageInvitationEmail = ({
  invitedName,
  inviterName,
  inviterEmail,
  role,
  personalMessage,
  signupUrl,
}: VillageInvitationEmailProps) => (
  <Html>
    <Head />
    <Preview>You're invited to join {inviterName}'s village on Eloura</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>You're Invited! 🏡</Heading>
        
        <Text style={text}>
          Hi {invitedName},
        </Text>
        
        <Text style={text}>
          <strong>{inviterName}</strong> ({inviterEmail}) has invited you to join their support network on Eloura as a <strong>{role}</strong>.
        </Text>
        
        {personalMessage && (
          <Section style={messageSection}>
            <Text style={messageText}>
              "{personalMessage}"
            </Text>
          </Section>
        )}
        
        <Text style={text}>
          Eloura helps families organize their daily lives, coordinate tasks, and build stronger support networks. By joining {inviterName}'s village, you'll be able to:
        </Text>
        
        <Text style={list}>
          • Help coordinate household tasks and activities<br />
          • Stay connected with important family updates<br />
          • Offer and receive support when needed<br />
          • Be part of a caring community
        </Text>
        
        <Section style={buttonSection}>
          <Link href={signupUrl} style={button}>
            Join {inviterName}'s Village
          </Link>
        </Section>
        
        <Hr style={hr} />
        
        <Text style={footer}>
          If you have any questions, you can reply directly to {inviterName} at {inviterEmail}.
        </Text>
        
        <Text style={footer}>
          This invitation was sent through Eloura, a family organization platform.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default VillageInvitationEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #eaeaea',
  borderRadius: '12px',
  margin: '40px auto',
  padding: '20px',
  width: '465px',
}

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '28px',
  margin: '0 0 20px',
  textAlign: 'center' as const,
}

const text = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
}

const messageSection = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '8px',
  margin: '20px 0',
  padding: '16px',
}

const messageText = {
  color: '#495057',
  fontSize: '16px',
  fontStyle: 'italic',
  lineHeight: '24px',
  margin: '0',
}

const list = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
  paddingLeft: '16px',
}

const buttonSection = {
  margin: '32px 0',
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#059669',
  border: 'none',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  padding: '12px 24px',
  textAlign: 'center' as const,
  textDecoration: 'none',
}

const hr = {
  border: 'none',
  borderTop: '1px solid #eaeaea',
  margin: '20px 0',
}

const footer = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '12px 0 0',
}