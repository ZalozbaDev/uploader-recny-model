/* eslint-disable react/jsx-no-target-blank */
import { Container, Typography, Paper } from '@mui/material'
import { FC } from 'react'

const DataProtection: FC<{}> = () => {
  return (
    <Container maxWidth='lg' sx={{ height: '100%', padding: 0 }}>
      <Paper
        elevation={8}
        sx={{
          padding: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          minHeight: '100%',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <Typography variant='h4' textAlign='center'>
          škit datow
        </Typography>
        <div id='c1089' className='csc-default'>
          <p className='bodytext'>
            Die Internetpräsentation{' '}
            <a href='https://zalozba.de' target='_blank" rel="nofollow'>
              zalozba.de
            </a>{' '}
            wird von der
          </p>
          <p className='bodytext'>
            <b>Stiftung für das sorbische Volk</b>
            <br />
            Postplatz 2, 02625 Bautzen
            <br />
            betrieben.
          </p>
          <p className='bodytext'>
            Die Stiftung erhebt und nutzt personenbezogene Daten ausschließlich in Übereinstimmung
            mit dem jeweils geltenden Datenschutzrecht. Wir erläutern Ihnen anhand dieser
            Datenschutzerklärung, wie Ihre Daten genutzt werden.
          </p>
          <p className='bodytext'>
            Personenbezogene Daten werden grundsätzlich nur erhoben und gespeichert, wenn Sie diesem
            zustimmen, oder die Erhebung der Daten für die Erbringung einer Leistung, einbezogen der
            Kontaktaufnahme notwendig ist.
          </p>
          <p className='bodytext'>
            Internetpräsentation:
            <br />
            Bei jedem Zugriff eines Nutzers auf das Angebot der Stiftung werden Daten wie:
            <br />
            die Dateianfrage des Clients (Dateiname und URL) <br />
            den http-Antwort-Code
            <br />
            die Internet-Seite, von der aus Sie Seiten der Stiftung besuchen
            <br />
            in einer Protokolldatei auf dem Webserver gespeichert. Die Daten werden nur für interne
            statistische Zwecke ausgewertet.
          </p>
          <p className='bodytext'>
            Ein Rückschluss auf Personen ist ohne Einleitung rechtlicher Schritte, bei denen die von
            Ihrem Provider bei jeder Ihrer Internet-Sitzungen dynamisch vergebenen IP-Adresse
            ermittelt wird, nicht möglich.
          </p>
          <p className='bodytext'>
            Darüber hinausgehende personenbezogene Daten, wie:
            <br />
            Ihr Name, Anschrift, Telefonnummer oder E-Mail-Adresse
            <br />
            werden nicht erfasst, es sei denn, diese Angaben werden von Ihnen freiwillig gemacht,
            z.B. bei Kontaktformularen zum Zwecke der Kontaktaufnahme oder bei der Registrierung für
            bestimmte Dienste zur Erbringung von Leistungen.
          </p>
          <p className='bodytext'>
            Verwendung Ihrer Daten:
            <br />
            Die erhobenen Daten werden nur von der Stiftung gespeichert und genutzt.
            <br />
            Wenn Sie unsere Kontaktformulare benutzen oder/und uns E-Mails senden, gehen wir davon
            aus, dass Sie der Speicherung dieser Daten ausdrücklich zustimmen.
          </p>
          <p className='bodytext'>
            <b>Löschung von Daten/Auskunft</b>
          </p>
          <p className='bodytext'>
            Es ist jederzeit möglich Ihr Einverständnis zur Speicherung personenbezogener Daten
            schriftlich oder per E-Mail zu widerrufen und die Löschung Ihrer Daten zu fordern.
          </p>
          <p className='bodytext'>
            <b>Kritiken und Hinweise</b> erbitten wir per E-Mail an:
            <br />
            <a href='mailto:sekretariat@zalozba.de'>sekretariat@zalozba.de</a>
          </p>
        </div>
      </Paper>
    </Container>
  )
}

export default DataProtection
