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

  Font.registerHyphenationCallback((word) => [word]);
};

registerResumePdfFonts();

const colors = {
  paper: '#FBFAF7',
  surface: '#FFFFFF',
  ink: '#1C1A17',
  muted: '#6F685E',
  accent: '#8A5B40',
  accentSoft: '#F2EEE8',
  border: '#DCD7CE',
  hairline: '#E6E1D9',
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
  header: {
    height: 104,
    paddingTop: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  eyebrow: {
    marginBottom: 10,
    color: colors.muted,
    fontWeight: 500,
    fontSize: 6.6,
    letterSpacing: 2.1,
    textTransform: 'uppercase',
  },
  identity: {
    maxWidth: 400,
    fontSize: 28,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: -0.9,
  },
  subtitle: {
    marginTop: 10,
    color: colors.muted,
    fontSize: 7.4,
    letterSpacing: 0.5,
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
    paddingTop: 4,
    paddingLeft: 16,
    borderLeftWidth: 1,
    borderLeftColor: colors.hairline,
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
    width: 24,
    color: colors.muted,
    fontWeight: 400,
    fontSize: 6.3,
    letterSpacing: 0.7,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 500,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  sectionLine: {
    flexGrow: 1,
    height: 1,
    marginLeft: 10,
    backgroundColor: colors.hairline,
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
    left: -30.5,
    top: 3.5,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.border,
  },
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  role: {
    flexGrow: 1,
    fontSize: 9.6,
    fontWeight: 600,
    lineHeight: 1.25,
  },
  period: {
    flexShrink: 0,
    color: colors.muted,
    fontWeight: 400,
    fontSize: 6.45,
    lineHeight: 1.3,
    letterSpacing: 0.15,
    textAlign: 'right',
  },
  company: {
    marginTop: 3,
    marginBottom: 6,
    color: colors.muted,
    fontSize: 7.1,
  },
  bullets: {
    gap: 2.5,
  },
  bulletRow: {
    flexDirection: 'row',
  },
  bullet: {
    width: 9,
    color: colors.muted,
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
    borderRadius: 2,
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
    color: colors.muted,
    fontWeight: 500,
    fontSize: 6.4,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  cardLine: {
    flexGrow: 1,
    height: 1,
    marginLeft: 8,
    backgroundColor: colors.hairline,
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  languageRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 1,
  },
  language: {
    fontSize: 7.8,
    fontWeight: 500,
  },
  level: {
    color: colors.muted,
    fontSize: 6.1,
    letterSpacing: 0.5,
  },
  contactItem: { marginBottom: 9 },
  contactValue: {
    color: colors.ink,
    fontSize: 6.9,
    lineHeight: 1.45,
  },
  sidebarSection: {
    marginBottom: 21,
  },
  educationItem: {
    paddingTop: 2,
    paddingBottom: 12,
    marginBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  educationItemLast: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  educationDegree: {
    color: colors.ink,
    fontSize: 8.15,
    fontWeight: 600,
    lineHeight: 1.3,
  },
  educationPeriod: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 6.1,
    letterSpacing: 0.5,
    lineHeight: 1.3,
  },
  educationSchool: {
    marginTop: 4,
    color: colors.ink,
    fontSize: 6.5,
    lineHeight: 1.4,
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
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  sidebarNoteText: {
    paddingLeft: 8,
    color: colors.muted,
    fontSize: 6.2,
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    left: 34,
    right: 34,
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: colors.muted,
    fontSize: 5.8,
    letterSpacing: 1.2,
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
        <View style={styles.header}>
          <Text style={styles.eyebrow}>{content.title} · MEHDI.DEV</Text>
          <Text style={styles.identity}>Mehdi Oulad Khlie</Text>
          <Text style={styles.subtitle}>{content.subtitle}</Text>
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
