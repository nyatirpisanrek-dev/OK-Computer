'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Cpu, Monitor, HardDrive, Zap, Users, Award, Shield, HeadphonesIcon } from 'lucide-react'
import ProfileCard from '../ProfileCard'
import oksihImage from '../../images/oksih.jpg'

const features = [
  {
    icon: Cpu,
    title: 'Premium Components',
    description: 'Curated selection of high-performance PC components from trusted manufacturers.'
  },
  {
    icon: Monitor,
    title: 'Expert Guidance',
    description: 'Professional recommendations and compatibility checks for your build.'
  },
  {
    icon: HardDrive,
    title: 'Quality Assurance',
    description: 'Rigorous testing and quality control on all products before shipping.'
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Quick and secure shipping with real-time tracking updates.'
  }
]

const stats = [
  { label: 'Komponen', value: '500+' },
  { label: 'Pelanggan Puas', value: '10K+' },
  { label: 'Tahun Pengalaman', value: '5+' },
  { label: 'Negara Dilayani', value: '25+' }
]



export function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-secondary-500/3 to-accent-500/2" />
        <div className="container-max relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-100 bg-clip-text text-transparent mb-6">
              Tentang KomponenPC
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Memberdayakan para penggemar PC dengan komponen premium dan panduan ahli untuk membangun sistem yang sempurna.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
              Misi Kami
            </h2>
            <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed mb-12">
              Kami bersemangat tentang menghubungkan pembangun PC dengan komponen berkualitas tertinggi yang tersedia.
              Misi kami adalah membuat pembangunan PC dapat diakses, andal, dan menyenangkan untuk semua orang,
              dari pemula hingga profesional berpengalaman.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg"
              >
                <Shield className="w-12 h-12 text-primary-500 mb-4" />
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  Kualitas Terlebih Dahulu
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Setiap komponen menjalani pengujian ketat untuk memastikan memenuhi standar tinggi kami
                  untuk performa dan keandalan.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg"
              >
                <Users className="w-12 h-12 text-secondary-500 mb-4" />
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  Didorong Komunitas
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Dibangun oleh penggemar PC untuk penggemar PC. Kami mendengarkan komunitas kami
                  dan terus meningkatkan layanan kami.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-neutral-800">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Mengapa Memilih Kami
            </h2>
            <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              Kami menyediakan semua yang Anda butuhkan untuk membangun PC impian Anda dengan percaya diri.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-primary-100 dark:bg-primary-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-16">
              Dampak Kami
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-black text-primary-600 dark:text-primary-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-neutral-700 dark:text-neutral-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-white dark:bg-neutral-800">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Temui Pendiri Kami
            </h2>
            <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              Ahli yang bersemangat yang berdedikasi untuk membantu Anda membangun PC yang sempurna.
            </p>
          </motion.div>

          <div className="flex justify-center">
            <ProfileCard
              name="Indra Priyatna"
              title="Telkom Student"
              avatarUrl={oksihImage.src}
              miniAvatarUrl={oksihImage.src}
              handle="indrapriyatnad"
              status="Online"
              contactText="Connect"
              behindGradient="radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)"
              innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
              onContactClick={() => console.log('Contact clicked')}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Award className="w-16 h-16 text-primary-500 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Siap Membuat PC Impian Anda?
            </h2>
            <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-8">
              Bergabunglah dengan ribuan pelanggan puas yang mempercayai kami dengan kebutuhan pembangunan PC mereka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Mulai Membuat
              </button>
              <button className="border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Hubungi Dukungan
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
