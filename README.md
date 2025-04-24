# IT-ISQS Topluluğu Web Sitesi

Bu proje, Bilişim Teknolojileri ve Bilişim Sistemleri bölümlerine yönelik, oturum açma, forum, etkinlik takibi, proje işbirliği ve daha fazlasını sağlayan bir topluluk web sitesidir.

## Proje Mimarisi

Proje, frontend ve backend olmak üzere iki ana bölümden oluşmaktadır:

### Backend

- **Teknoloji**: Java Spring Boot
- **Veritabanı**: PostgreSQL
- **Kimlik Doğrulama**: JWT ve OAuth2 (Google, Github)
- **Depolama**: Amazon S3
- **İçerik Analizi**: Resim moderasyonu için Rekognition

### Frontend

- **Teknoloji**: React.js
- **State Yönetimi**: React Hooks
- **Stil**: CSS (Styled Components)
- **HTTP İstekleri**: Axios

## Başlangıç

### Gereksinimler

- Node.js (v16+)
- Java 17+
- PostgreSQL
- AWS hesabı (S3 ve Rekognition için)

### Kurulum

1. **Backend**

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

2. **Frontend**

```bash
cd frontend
npm install
npm start
```

## API Endpoints

### Kullanıcı Yönetimi

#### Kimlik Doğrulama

- `POST /api/v1/users/login`: Kullanıcı girişi
- `POST /api/v1/users/register`: Yeni kullanıcı kaydı
- `POST /api/v1/users/verify`: Email doğrulama
- `POST /api/v1/users/forgot-password`: Şifre yenileme isteği
- `POST /api/v1/users/reset-password`: Şifre yenileme

#### Kullanıcı Profili

- `GET /api/v1/users/{id}`: Kullanıcı profilini görüntüleme
- `PUT /api/v1/users/{id}`: Kullanıcı profilini güncelleme
- `PUT /api/v1/users/{id}/password`: Kullanıcı şifresini güncelleme
- `POST /api/v1/users/{id}/upload-profile-picture`: Profil fotoğrafı yükleme
- `POST /api/v1/users/{id}/remove-profile-picture`: Profil fotoğrafını kaldırma

### Forum

- `GET /api/v1/forum/categories`: Forum kategorilerini listeleme
- `GET /api/v1/forum/posts`: Tüm forum gönderilerini listeleme
- `GET /api/v1/forum/posts/{id}`: Belirli bir gönderinin detaylarını görüntüleme
- `POST /api/v1/forum/posts`: Yeni gönderi oluşturma
- `PUT /api/v1/forum/posts/{id}`: Gönderiyi güncelleme
- `DELETE /api/v1/forum/posts/{id}`: Gönderiyi silme
- `POST /api/v1/forum/posts/{id}/comments`: Gönderiye yorum ekleme

### Admin

- `GET /api/v1/admin/users`: Tüm kullanıcıları listeleme
- `GET /api/v1/admin/users/{id}`: Belirli bir kullanıcının detaylarını görüntüleme
- `PUT /api/v1/admin/users/{id}`: Kullanıcı bilgilerini güncelleme
- `PUT /api/v1/admin/users/{id}/block`: Kullanıcıyı engelleme/engelini kaldırma
- `PUT /api/v1/admin/users/{id}/activate`: Kullanıcıyı aktifleştirme/deaktifleştirme

## Proje Yapısı

### Backend

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── devEra/
│   │   │           └── ws/
│   │   │               ├── api/
│   │   │               │   └── controller/      # API Controllers
│   │   │               ├── config/              # Konfigürasyon sınıfları
│   │   │               │   ├── security/        # Güvenlik konfigürasyonları
│   │   │               │   └── s3/              # AWS S3 konfigürasyonu
│   │   │               ├── core/                # Temel sınıflar
│   │   │               │   ├── enums/           # Enum sınıfları
│   │   │               │   ├── error/           # Hata sınıfları
│   │   │               │   └── message/         # Mesaj sınıfları
│   │   │               ├── dto/                 # Data Transfer Objects
│   │   │               │   ├── request/         # İstek DTO'ları
│   │   │               │   └── response/        # Yanıt DTO'ları
│   │   │               ├── entity/              # Veri modeli sınıfları
│   │   │               │   └── Forum/           # Forum ile ilgili entityler
│   │   │               ├── exception/           # Özel istisna sınıfları
│   │   │               ├── repository/          # Veritabanı repository'leri
│   │   │               │   └── Forum/           # Forum repository'leri
│   │   │               ├── service/             # İş mantığı servisleri
│   │   │               └── util/                # Yardımcı sınıflar
│   │   └── resources/
│   │       └── application.properties           # Uygulama konfigürasyonu
│   └── test/                                   # Test sınıfları
```

### Frontend

```
frontend/
├── public/                                     # Statik dosyalar
├── src/
│   ├── components/                             # Yeniden kullanılabilir bileşenler
│   ├── contexts/                               # React Context API
│   ├── hooks/                                  # Özel React Hooks
│   ├── pages/                                  # Sayfa bileşenleri
│   ├── services/                               # API servisleri
│   ├── styles/                                 # Stil dosyaları
│   ├── utils/                                  # Yardımcı fonksiyonlar
│   ├── App.js                                  # Ana uygulama bileşeni
│   └── index.js                                # Uygulama giriş noktası
```

## Güvenlik Katmanı

1. **JWT Tabanlı Kimlik Doğrulama**
   - `JwtTokenService`: Token oluşturma ve doğrulama
   - `JwtAuthorizationFilter`: İstekleri filtrele ve token doğrulama

2. **OAuth2 Entegrasyonu**
   - Google ve GitHub ile giriş
   - `OAuth2SecurityConfig`: OAuth2 konfigürasyonu

3. **Yetkilendirme**
   - Kullanıcı/Admin ayrımı
   - Kaynak bazlı erişim kontrolü

## Fonksiyonel Özellikler

1. **Kullanıcı Yönetimi**
   - Kayıt ve giriş
   - Şifre sıfırlama
   - Profil güncelleme

2. **Forum**
   - Kategorilere ayrılmış gönderiler
   - Yorum yapma
   - Gönderi kaydetme

3. **Admin Paneli**
   - Kullanıcı yönetimi
   - İçerik moderasyonu

## AWS Entegrasyonu

1. **S3**
   - Profil fotoğrafları ve gönderi ekleri için depolama
   - Ön imzalı URL'ler ile güvenli yükleme

2. **Rekognition**
   - Uygunsuz içerik tespiti
   - Moderasyon kontrolü

## Geliştirme Kılavuzu

### Yeni Endpoint Ekleme

1. DTO'ları tanımla (request/response)
2. Repository sınıfını genişlet (gerekirse)
3. Service sınıfına yeni metot ekle
4. Controller'a yeni endpoint ekle
5. Frontend'de ilgili API servisini güncelle

### Frontend Bileşeni Ekleme

1. Component klasöründe yeni bileşen oluştur
2. Style dosyasını hazırla
3. Gerekli API çağrılarını implement et
4. Router'a yeni rotayı ekle

## Sorun Giderme

### Yaygın Hatalar

- **401 Unauthorized**: JWT token eksik veya geçersiz
- **403 Forbidden**: Kullanıcının kaynağa erişim yetkisi yok
- **500 Internal Server Error**: Backend'de beklenmeyen bir hata oluştu

### Hata Ayıklama İpuçları

- Backend loglarını kontrol et
- Tarayıcı konsolunu kontrol et
- Network isteklerini ve yanıtlarını incele

## Katkı Sağlama

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add new feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## İletişim

Proje ile ilgili sorularınız için: [email protected]
