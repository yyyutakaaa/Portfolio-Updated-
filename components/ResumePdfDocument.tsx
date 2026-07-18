import React from 'react';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { translations } from '../utils/translations';

type ResumeContent = (typeof translations)['nl']['resume'];

interface ResumePdfDocumentProps {
  content: ResumeContent;
}

const fontBaseUrl = `${import.meta.env.BASE_URL}fonts/`;

export const registerResumePdfFonts = () => {
  Font.register({
    family: 'Helvetica',
    fonts: [
      { src: 'Helvetica', fontWeight: 400 },
      { src: 'Helvetica-Bold', fontWeight: 700 },
    ],
  });

  Font.register({
    family: 'Manrope',
    fonts: [
      { src: `${fontBaseUrl}Manrope-400.ttf`, fontWeight: 400 },
      { src: `${fontBaseUrl}Manrope-600.ttf`, fontWeight: 600 },
      { src: `${fontBaseUrl}Manrope-800.ttf`, fontWeight: 800 },
    ],
  });

  Font.register({
    family: 'IBM Plex Mono',
    fonts: [
      { src: `${fontBaseUrl}IBMPlexMono-Regular.ttf`, fontWeight: 400 },
      { src: `${fontBaseUrl}IBMPlexMono-Medium.ttf`, fontWeight: 500 },
    ],
  });

  Font.registerHyphenationCallback((word) => [word]);
};

registerResumePdfFonts();

const colors = {
  paper: '#FCFCF8',
  surface: '#FFFFFF',
  ink: '#17201D',
  muted: '#4F5B56',
  accent: '#5F7F17',
  accentSoft: '#EEF2E4',
  border: '#D9DED7',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    paddingTop: 33,
    paddingRight: 34,
    paddingBottom: 29,
    paddingLeft: 34,
    backgroundColor: colors.paper,
    color: colors.ink,
    fontFamily: 'Manrope',
    fontSize: 8,
    lineHeight: 1.36,
  },
  topRule: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 9,
    backgroundColor: colors.accent,
  },
  header: {
    height: 102,
    paddingTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  eyebrow: {
    marginBottom: 8,
    color: colors.accent,
    fontFamily: 'IBM Plex Mono',
    fontWeight: 500,
    fontSize: 7.1,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  identity: {
    maxWidth: 400,
    fontSize: 27,
    fontWeight: 800,
    lineHeight: 0.94,
    letterSpacing: -1.05,
  },
  subtitle: {
    marginTop: 9,
    color: colors.muted,
    fontFamily: 'IBM Plex Mono',
    fontSize: 7.1,
    letterSpacing: 1.15,
  },
  headerAccent: {
    position: 'absolute',
    left: 0,
    bottom: -1,
    width: 96,
    height: 2.2,
    backgroundColor: colors.accent,
  },
  content: {
    flexDirection: 'row',
    gap: 20,
    paddingTop: 21,
  },
  main: {
    width: 350,
  },
  sidebar: {
    width: 157,
    paddingTop: 15,
    paddingRight: 14,
    paddingBottom: 15,
    paddingLeft: 14,
    borderRadius: 10,
    backgroundColor: colors.accentSoft,
  },
  section: {
    marginBottom: 17,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionIndex: {
    width: 27,
    color: colors.accent,
    fontFamily: 'IBM Plex Mono',
    fontWeight: 500,
    fontSize: 6.3,
    letterSpacing: 0.7,
  },
  sectionTitle: {
    fontSize: 10.3,
    fontWeight: 800,
    letterSpacing: 0.55,
    textTransform: 'uppercase',
  },
  sectionLine: {
    flexGrow: 1,
    height: 1,
    marginLeft: 10,
    backgroundColor: colors.border,
  },
  timeline: {
    position: 'relative',
    paddingLeft: 27,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    marginLeft: 3,
  },
  entry: {
    position: 'relative',
    marginBottom: 15,
  },
  lastEntry: {
    marginBottom: 0,
  },
  dot: {
    position: 'absolute',
    left: -31.5,
    top: 2.5,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.4,
    borderColor: colors.accent,
    backgroundColor: colors.paper,
  },
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  role: {
    flexGrow: 1,
    fontSize: 9.5,
    fontWeight: 800,
    lineHeight: 1.2,
  },
  period: {
    flexShrink: 0,
    color: colors.accent,
    fontFamily: 'IBM Plex Mono',
    fontWeight: 500,
    fontSize: 6.45,
    lineHeight: 1.3,
    letterSpacing: 0.15,
    textAlign: 'right',
  },
  company: {
    marginTop: 3,
    marginBottom: 5,
    color: colors.muted,
    fontFamily: 'IBM Plex Mono',
    fontSize: 7,
  },
  bullets: {
    gap: 2.5,
  },
  bulletRow: {
    flexDirection: 'row',
  },
  bullet: {
    width: 9,
    color: colors.accent,
    fontFamily: 'IBM Plex Mono',
    fontSize: 6.2,
  },
  bulletText: {
    flex: 1,
    color: colors.muted,
    fontSize: 7.45,
    lineHeight: 1.36,
  },
  card: {
    marginBottom: 13,
    paddingTop: 13,
    paddingRight: 13,
    paddingBottom: 14,
    paddingLeft: 13,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.surface,
  },
  accentCard: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  cardLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
  },
  cardLabel: {
    color: colors.ink,
    fontFamily: 'IBM Plex Mono',
    fontWeight: 500,
    fontSize: 6.4,
    letterSpacing: 1.25,
    textTransform: 'uppercase',
  },
  cardLine: {
    flexGrow: 1,
    height: 1,
    marginLeft: 8,
    backgroundColor: '#C8D0C1',
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  languageRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 1,
  },
  language: {
    fontSize: 7.8,
    fontWeight: 600,
  },
  level: {
    color: colors.accent,
    fontFamily: 'IBM Plex Mono',
    fontSize: 6.1,
  },
  contactItem: { marginBottom: 9 },
  contactValue: {
    color: colors.ink,
    fontFamily: 'IBM Plex Mono',
    fontSize: 6.35,
    lineHeight: 1.4,
  },
  sidebarSection: {
    marginBottom: 21,
  },
  educationItem: {
    paddingTop: 2,
    paddingBottom: 12,
    marginBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#C8D0C1',
  },
  educationItemLast: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  educationDegree: {
    color: colors.ink,
    fontSize: 8.15,
    fontWeight: 800,
    lineHeight: 1.25,
  },
  educationPeriod: {
    marginTop: 4,
    color: colors.accent,
    fontFamily: 'IBM Plex Mono',
    fontSize: 6.1,
    lineHeight: 1.3,
  },
  educationSchool: {
    marginTop: 4,
    color: colors.ink,
    fontFamily: 'IBM Plex Mono',
    fontSize: 6,
    lineHeight: 1.35,
  },
  educationDescription: {
    marginTop: 5,
    color: colors.muted,
    fontSize: 6.95,
    lineHeight: 1.42,
  },
  sidebarNote: {
    marginTop: 4,
    paddingLeft: 3,
    borderLeftWidth: 2,
    borderLeftColor: colors.accent,
  },
  sidebarNoteText: {
    paddingLeft: 8,
    color: colors.muted,
    fontFamily: 'IBM Plex Mono',
    fontSize: 5.8,
    lineHeight: 1.45,
  },
  footer: {
    position: 'absolute',
    left: 34,
    right: 34,
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: colors.muted,
    fontFamily: 'IBM Plex Mono',
    fontSize: 5.5,
    letterSpacing: 0.55,
  },
});

const SectionHeading: React.FC<{ index: string; title: string }> = ({ index, title }) => (
  <View style={styles.sectionHeading}>
    <Text style={styles.sectionIndex}>{index}</Text>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionLine} />
  </View>
);

const CardHeading: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.cardLabelRow}>
    <Text style={styles.cardLabel}>{title}</Text>
    <View style={styles.cardLine} />
  </View>
);

const ResumePdfDocument: React.FC<ResumePdfDocumentProps> = ({ content }) => {
  const languages = [
    [content.languages.dutch, content.languages.native],
    [content.languages.arabic, content.languages.native],
    [content.languages.english, content.languages.fluent],
    [content.languages.french, content.languages.basic],
  ];

  return (
    <Document
      title="CV - Mehdi Oulad Khlie"
      author="Mehdi Oulad Khlie"
      subject={content.subtitle}
      creator="mehdioul.dev"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.topRule} fixed />
        <View style={styles.header}>
          <Text style={styles.eyebrow}>{content.title} · MEHDI.DEV</Text>
          <Text style={styles.identity}>Mehdi Oulad Khlie</Text>
          <Text style={styles.subtitle}>{content.subtitle}</Text>
          <View style={styles.headerAccent} />
        </View>

        <View style={styles.content}>
          <View style={styles.main}>
            <View>
              <SectionHeading index="01" title={content.experienceTitle} />
              <View style={styles.timeline}>
                {content.jobs.map((job, index) => (
                  <View
                    key={`${job.company}-${job.period}`}
                    style={[styles.entry, index === content.jobs.length - 1 ? styles.lastEntry : {}]}
                    wrap={false}
                  >
                    <View style={styles.dot} />
                    <View style={styles.roleRow}>
                      <Text style={styles.role}>{job.role}</Text>
                      <Text style={styles.period}>{job.period}</Text>
                    </View>
                    <Text style={styles.company}>{job.company}</Text>
                    <View style={styles.bullets}>
                      {job.description.map((description) => (
                        <View key={description} style={styles.bulletRow}>
                          <Text style={styles.bullet}>—</Text>
                          <Text style={styles.bulletText}>{description}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>

          </View>

          <View style={styles.sidebar}>
            <View style={styles.sidebarSection} wrap={false}>
              <CardHeading title={content.contact.title} />
              <View style={styles.contactItem}>
                <Text style={styles.contactValue}>Evergem, België</Text>
              </View>
              <View style={styles.contactItem}>
                <Text style={styles.contactValue}>mehdi.ouladkhlie@outlook.be</Text>
              </View>
              <View>
                <Text style={styles.contactValue}>+32 465 13 66 79</Text>
              </View>
            </View>

            <View style={styles.sidebarSection} wrap={false}>
              <CardHeading title={content.languages.title} />
              {languages.map(([language, level], index) => (
                <View
                  key={language}
                  style={[styles.languageRow, index === languages.length - 1 ? styles.languageRowLast : {}]}
                >
                  <Text style={styles.language}>{language}</Text>
                  <Text style={styles.level}>{level}</Text>
                </View>
              ))}
            </View>

            <View wrap={false}>
              <CardHeading title={content.educationTitle} />
              {content.educationList.map((education, index) => (
                <View
                  key={`${education.school}-${education.period}`}
                  style={[
                    styles.educationItem,
                    index === content.educationList.length - 1 ? styles.educationItemLast : {},
                  ]}
                >
                  <Text style={styles.educationDegree}>{education.degree}</Text>
                  <Text style={styles.educationPeriod}>{education.period}</Text>
                  <Text style={styles.educationSchool}>{education.school}</Text>
                  <Text style={styles.educationDescription}>{education.description}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text>MEHDI OULAD KHLIE</Text>
          <Text>01 / 01</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePdfDocument;
