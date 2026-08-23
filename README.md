# Phần mềm Quản lý Sân bóng (FPMS) - Frontend

Đây là dự án Frontend cho Hệ thống Quản lý Sân bóng nhân tạo. Giao diện được xây dựng bằng React, TypeScript, Vite và Vanilla CSS, mang đến trải nghiệm hiện đại, tốc độ cao và thân thiện với người dùng (bao gồm cả luồng cho Khách hàng và Admin).

## 🚀 Công nghệ sử dụng
- **Core:** React 18, TypeScript, Vite
- **Routing:** React Router DOM
- **Styling:** Vanilla CSS (CSS Variables)
- **Icons:** Lucide React
- **Biểu đồ:** Recharts

## 📋 Yêu cầu hệ thống
Để chạy được dự án, máy tính của bạn cần cài đặt sẵn:
- **Node.js** (phiên bản 16.x trở lên, khuyên dùng bản LTS mới nhất)
- **npm** (được cài đặt kèm với Node.js) hoặc **yarn**

## 🛠️ Hướng dẫn Cài đặt & Chạy dự án

Thực hiện các bước sau trong Terminal / Command Prompt sau khi đã clone mã nguồn từ GitHub về máy:

### Bước 1: Di chuyển vào thư mục frontend
Mã nguồn frontend của dự án được đặt trong thư mục `frontend`. Bạn cần truy cập vào thư mục này:
```bash
cd frontend
```

### Bước 2: Cài đặt các thư viện phụ thuộc (Dependencies)
Chạy lệnh sau để tải và cài đặt tất cả các thư viện cần thiết cho dự án:
```bash
npm install
```
*(Nếu bạn sử dụng yarn, hãy chạy lệnh `yarn install`)*

### Bước 3: Khởi chạy dự án ở môi trường phát triển (Development)
Chạy lệnh sau để khởi động server cục bộ:
```bash
npm run dev
```
*(Hoặc `yarn dev`)*

Sau khi lệnh chạy thành công, Terminal sẽ hiển thị một đường dẫn (thường là `http://localhost:5173`). Bạn hãy `Ctrl + Click` hoặc copy đường dẫn đó dán vào trình duyệt web để xem giao diện dự án.

## 📁 Cấu trúc thư mục chính
- `/frontend/src/pages/`: Chứa các trang giao diện chính (Home, Login, Admin Dashboard, v.v.)
- `/frontend/src/layouts/`: Chứa bố cục khung của ứng dụng (Customer Layout, Admin Layout)
- `/frontend/src/components/`: Chứa các UI Component dùng chung (đang phát triển)
- `/frontend/src/mocks/`: Chứa dữ liệu giả (mock data) phục vụ cho việc thiết kế UI trước khi có API thực tế
- `/frontend/src/index.css`: Chứa toàn bộ CSS toàn cục và các biến màu sắc (CSS Variables)

---
*Lưu ý: Dự án hiện tại đang sử dụng Mock Data thuần túy ở phía Frontend để phục vụ quá trình thiết kế UI. Việc tích hợp API Backend sẽ được thực hiện trong các giai đoạn tiếp theo.*
