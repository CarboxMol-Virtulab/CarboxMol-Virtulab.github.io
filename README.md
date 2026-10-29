# 🔬 CarboxMol VirtuLab — Official Web & PWA Portal
### Qərbi Kaspi Universiteti Virtual Laboratoriya və 3D Anatomiya Tədris Platforması
### Western Caspian University Virtual Laboratory & 3D Interactive Anatomy Platform

<div align="center">

[![Live Portal](https://img.shields.io/badge/🌐_Live_Portal-carboxmol--virtulab.github.io-002B49?style=for-the-badge&logo=github)](https://carboxmol-virtulab.github.io)
[![PWA Ready](https://img.shields.io/badge/📱_PWA-100%25_Offline_Ready-2ea44f?style=for-the-badge&logo=pwa)](https://carboxmol-virtulab.github.io)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_3D-049EF4?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MPL--2.0-blue?style=for-the-badge)](LICENSE)

</div>

---

## 🏛 Akademik Mənsubiyyət / Academic Affiliation

* **Ali Təhsil Müəssisəsi:** [Qərbi Kaspi Universiteti](https://wcu.edu.az/) | [Western Caspian University (WCU)](https://wcu.edu.az/)
* **Kafedra:** Təbiət Elmləri Kafedrası (Department of Natural Sciences)
* **Müəllif və Tərtibatçı:** **Suleiman M. Hajizadeh** ([@SuleimanHajizadeh](https://github.com/SuleimanHajizadeh)) — *Bioinformatika, Tətbiqi Biologiya və Kompüter Elmləri*
* **Əlaqə:** [suleyman.hacizade1@gmail.com](mailto:suleyman.hacizade1@gmail.com)
* **Rəsmi GitHub Təşkilatı:** [CarboxMol-Virtulab](https://github.com/CarboxMol-Virtulab)

---

## 🔒 Mənbə Kodu və Datalara Giriş İcazəsi / Private Data & Source Access

> [!IMPORTANT]
> **🇦🇿 Datalar və Mənbə Kodu Məxfidir (Private):**  
> Bu layihənin əsas mənbə kodu, 3D modelləri və elmi məlumat bazası (**data**) **Private** statusdadır. Giriş icazəsi (**Access**) əldə etmək istəyirsinizsə, müəllifin elektron poçtuna müraciət edə bilərsiniz:  
> 📧 **E-poçt:** [**suleyman.hacizade1@gmail.com**](mailto:suleyman.hacizade1@gmail.com?subject=CarboxMol%20VirtuLab%20-%20Private%20Data%20Access%20Request)
>
> **🇬🇧 Private Data & Source Code Notice:**  
> The source code and research datasets of this project are **Private**. If you wish to request **access**, please contact the author via email:  
> 📧 **Email:** [**suleyman.hacizade1@gmail.com**](mailto:suleyman.hacizade1@gmail.com?subject=CarboxMol%20VirtuLab%20-%20Private%20Data%20Access%20Request)

---

## 🌐 Rəsmi Keçidlər / Official Links

| Resurs | Keçid Linki | Təyinatı |
| :--- | :--- | :--- |
| 🚀 **Canlı Sayt (Production Web & PWA)** | [https://carboxmol-virtulab.github.io](https://carboxmol-virtulab.github.io) | İnteraktiv veb və oflayn PWA tətbiqi |
| 💻 **Əsas Mənbə Kodu (Source Code Repo)** | [CarboxMol-Virtulab/Carboxmol-virtulab](https://github.com/CarboxMol-Virtulab/Carboxmol-virtulab) | Layihənin Next.js & Three.js mənbə kodu |
| 📦 **İstehsalat Repozitoriyası (Pages Repo)** | [CarboxMol-Virtulab/CarboxMol-Virtulab.github.io](https://github.com/CarboxMol-Virtulab/CarboxMol-Virtulab.github.io) | GitHub Pages statik hosting |
| 🔀 **Köhnə Domen Yönləndiricisi** | `https://wcu-virtulab.vercel.app` &rarr; `carboxmol-virtulab.github.io` | HTTP 308 Permanent Redirect |

---

## 📱 PWA və Oflayn Sinxronizasiya (Offline-First Architecture)

**CarboxMol VirtuLab** qabaqcıl **Progressive Web App (PWA)** standartları ilə təchiz edilmişdir. İstənilən əməliyyat sistemində (iOS, Android, Windows, macOS, Linux, ChromeOS) həm brauzer üzərindən, həm də ana ekrana quraşdırılan müstəqil proqram (Standalone App) kimi istifadə edilə bilər.

### ⚡ Əsas Üstünlüklər:
1. **100% Oflayn İşləmə:** Tətbiq bir dəfə açıldıqdan və ya quraşdırıldıqdan sonra internet bağlantısı kəsildikdə belə bütün 3D anatomiya modelləri, mikroskop simulyatoru, laboratoriya sınaqları və testlər tam oflayn rejimdə fasiləsiz işləyir.
2. **Avtomatik Sinxron Yenilənmə:** Cihazınız internetə qoşulduqda Service Worker arxa planda avtomatik olaraq ən son yenilikləri, məlumat bazasını və versiyanı yoxlayır, keş yaddaşını yeniləyir və tətbiqi brauzerlə və ya quraşdırılmış PWA ilə tam sinxron saxlayır.
3. **Multi-Platform Quraşdırma:**
   * **Chrome / Edge (PC & Mac):** Ünvan sətrindəki *"Quraşdır"* (Install) düyməsini sıxın.
   * **Safari (iOS / iPadOS):** *"Paylaş"* (Share) menyusundan *"Ana ekrana əlavə et"* (Add to Home Screen) seçin.
   * **Android:** Ekranın aşağısındakı *"Əlavə et"* bildirişinə toxunun.

---

## 🌟 Əsas Tədris Modulları (Core Modules)

### 1. 🫀 İnteraktiv 3D İnsan Anatomiyası Atlası
* **3D Vizualizasiya:** WebGL & Three.js ilə orqanların 360 dərəcə fırladılması, yaxınlaşdırılması və rentgen (X-Ray) müşahidəsi.
* **Üçdilli Nomenklatura:** Hər bir orqan beynəlxalq standartlara uyğun olaraq:
  1. **Latın dili** (*Terminologia Anatomica*)
  2. **İngilis dili** (*English*)
  3. **Azərbaycan dili** (*Azərbaycan*)
* **Səsli Tələffüz (TTS):** Latınca anatomik terminlərin dəqiq fonetik səsləndirilməsi.
* **Klinik Patologiyalar:** Orqanların funksiyaları, klinik əhəmiyyəti və ən çox rast gəlinən patologiyalar.

### 2. 🔬 Virtual İşıq Mikroskopu Simulyatoru
* **Real Optik İdarəetmə:** 4x, 10x, 40x və 100x (yağ immersion) revolver obyektivləri.
* **Fokus Mexanizmi:** Makrometrik və mikrometrik tənzimləmə ilə real fiziki bulanıqlıq və kəskinlik effekti.
* **Zəngin Preparat Kolleksiyası:** İnsan qan yaxması, hərəki neyron, eninəzolaqlı əzələ, miokard, soğan zəri və bakteriyaların Qram boyanması.
* **Mikrometrik Tor:** Hüceyrələrin mikron (&micro;m) ölçüsünü hesablamaq üçün ölçü şəbəkəsi.

### 3. 🧪 İnteraktiv Laboratoriya Sınaqları
* **🩸 Qan Qrupunun Təyini (ABO & Rh):** Anti-A, Anti-B və Anti-D zərdabları ilə aqlütinasiya reaksiyası, dinamik klinik ssenarilər.
* **⚡ Katalaza Ferment Kinetikası:** Temperatur və pH dərəcəsinin ferment reaksiyasına təsiri, denaturasiya qrafiki.
* **🌊 Osmos və Eritrosit Davamlılığı:** Hipotonik (hemoliz), izotonik və hipertonik (plazmoliz/büzüşmə) mühit simulyasiyası.

### 4. 📚 Biotəhlükəsizlik və Avadanlıqlar (SOP)
* BSL-1-dən BSL-4-ə qədər biotəhlükəsizlik qaydaları, fövqəladə hallar protokolları.
* Avtomat mikropipetlər, sentrifuqa, spektrofotometr və avtoklavın istifadə təlimatları.

### 5. 🏆 İmtahan, Flashcards və Protokol
* Zəngin sual bazası əsasında interaktiv bilik qiymətləndirilməsi.
* 3D çevrilən Flashcard-lar və terminologiya lüğəti.
* Rəsmi laboratoriya nəticə protokolu / sertifikatı (PDF və çap üçün hazır).

---

## 🛠 Texnoloji Stack

* **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS, Lucide Icons
* **3D & Qrafika:** Three.js, WebGL Shaders, OrbitControls
* **PWA & Offline:** Service Worker, Cache Storage API, Web Manifest
* **Hosting:** GitHub Pages with GitHub Actions CI/CD Pipeline

---

## 📄 Müəlliflik Hüququ və Lisenziya

&copy; 2026 **CarboxMol VirtuLab** | **Qərbi Kaspi Universiteti (Western Caspian University)**  
Müəllif: **Suleiman M. Hajizadeh**  
Bu layihə **Mozilla Public License 2.0 (MPL-2.0)** lisenziyası altında təqdim olunur.
