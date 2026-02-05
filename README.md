# K Drama Hunters

드라마 촬영지 여행 가이드 웹사이트입니다. React + Vite + Tailwind CSS로 구성되어 있습니다.

## 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## Git에 올리기

```bash
git init
git add .
git commit -m "Initial commit: K Drama Hunters"
git branch -M main
git remote add origin https://github.com/사용자명/저장소명.git
git push -u origin main
```

## Vercel로 배포하기

1. [Vercel](https://vercel.com)에 로그인합니다.
2. **Add New** → **Project**를 선택합니다.
3. GitHub/GitLab/Bitbucket에서 이 저장소를 연결하거나, **Import Git Repository**로 저장소 URL을 입력합니다.
4. Vercel이 자동으로 프로젝트 타입(Vite)을 감지합니다.  
   - **Build Command**: `npm run build`  
   - **Output Directory**: `dist`  
   - **Install Command**: `npm install`
5. **Deploy**를 클릭하면 빌드 후 배포됩니다.

### 푸시 시 자동 배포 (기본 동작)

- Vercel에 GitHub 저장소를 연결해 두면 **`main` 브랜치에 푸시할 때마다 자동으로 재배포**됩니다.
- 확인 방법: Vercel 대시보드 → 프로젝트 → **Settings** → **Git**  
  - **Production Branch**: `main` 으로 되어 있으면, `git push origin main` 시마다 프로덕션 배포가 실행됩니다.
- 커밋 후 푸시만 하면 Vercel이 빌드 후 자동 반영합니다.

### 수동 배포 (Vercel CLI)

```bash
npm i -g vercel
vercel
```

프롬프트에 따라 로그인 후 프로젝트를 연결하면 배포됩니다.

## 기술 스택

- **React 18**
- **Vite 5**
- **Tailwind CSS 3**
- **lucide-react** (아이콘)

## 라이선스

© 2026 K DRAMA HUNTERS KOREA. ALL RIGHTS RESERVED.
