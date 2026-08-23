# HƯỚNG DẪN THIẾT KẾ GIAO DIỆN & KIẾN TRÚC REACT (FPMS)

Tài liệu này cung cấp hướng dẫn chi tiết để đội ngũ Frontend chuyển hóa các đặc tả trong **Chương 3 (Yêu cầu chức năng)** thành cấu trúc code **ReactJS + TypeScript** một cách chuẩn mực, dễ bảo trì và mở rộng.

---

## 1. Cấu trúc Layouts (Layout Architecture)

Trong React, chúng ta sẽ chia ứng dụng thành 2 Layouts độc lập hoàn toàn để tối ưu hiệu năng và quyền truy cập:

1. **`CustomerLayout.tsx` (Khách hàng)**
   - Bao gồm: `Navbar` (Logo, Menu chuyển trang, Avatar User) và `Footer`.
   - Bọc toàn bộ các trang dành cho người dùng cuối.
2. **`AdminLayout.tsx` (Nhân viên / Chủ sân)**
   - Bao gồm: `Sidebar` (Menu dọc bên trái chứa các module quản lý) và `Topbar` (Hiển thị ca trực, nút đăng xuất).
   - Có cơ chế chặn quyền (Protected Route) nếu User không có role `STAFF` hoặc `ADMIN`.

---

## 2. Sơ đồ Routing (React Router DOM)

Định nghĩa các đường dẫn url chuẩn xác cho 18 Use Case:

### Auth & Public
- `/login` - Đăng nhập (UC01)
- `/register` - Đăng ký (UC03)
- `/forgot-password` - Đặt lại mật khẩu (UC05)

### Khách hàng (Customer)
- `/` - Trang chủ (Timeline tìm sân) (UC06, UC07)
- `/checkout/:timeSlotId/:pitchId` - Trang xác nhận thanh toán cọc (UC08)
- `/my-bookings` - Lịch sử đặt sân (UC10) & Nút thanh toán nốt (UC09)
- `/profile` - Hồ sơ cá nhân (UC04)

### Nhân viên & Quản trị (Admin)
- `/admin/bookings` - Quản lý đơn đặt sân (UC11)
- `/admin/timeline` - Timeline ca đá thực tế (UC12)
- `/admin/transactions` - Theo dõi giao dịch (UC13)
- `/admin/users` - Quản lý người dùng (UC14) *(Chỉ Admin)*
- `/admin/pitches` - Quản lý sân bóng (UC15) *(Chỉ Admin)*
- `/admin/pricing` - Khung giờ, Giá & Ngày lễ (UC16, UC17) *(Chỉ Admin)*
- `/admin/reports` - Báo cáo thống kê (UC18) *(Chỉ Admin)*

---

## 3. Phân rã Component & Luồng Trang Khách hàng (Customer)

### 3.1. Trang Chủ / Đặt Sân (UC06, UC07, UC08)
- **UI Logic:** Giao diện dạng Ma trận (Timeline Matrix) tương tự rạp phim. Cột là Khung giờ, Hàng là Tên sân.
- **Components cần thiết:**
  - `DatePickerHeader`: Chọn ngày (Mặc định hôm nay). Nếu chọn đúng ngày Lễ (so khớp dữ liệu UC17), hiển thị Badge `🇻🇳 Áp dụng phụ thu Lễ`.
  - `TimelineMatrix`: Component lưới.
  - `MatrixCell`: Từng ô sân. Cần truyền `props`: `status` (Trống/Đã đặt), `price`, `isPeakHour` (Giờ vàng). 
  - `CheckoutModal` / `CheckoutPage`: Khi click ô trống, gọi hàm mở form thanh toán. Giao diện phải show công thức tính: `Giá (Đã +% Lễ) -> Phải cọc 30%`. Nút "Thanh toán VNPAY".

### 3.2. Lịch sử Đơn đặt sân (UC09, UC10)
- **UI Logic:** Bảng hiển thị danh sách đơn cá nhân, có phân loại màu sắc trạng thái rõ ràng.
- **Components cần thiết:**
  - `BookingListTable`: Table hiển thị các dòng dữ liệu.
  - `StatusBadge`: Nhãn trạng thái (Màu xanh: Sắp đá, Màu vàng: Đã đá xong chờ thanh toán nốt, Màu đỏ: Đã hủy).
  - **Hành động (Actions):** 
    - Đơn `SẮP ĐÁ`: Có nút `[Yêu cầu hủy]`. Bấm vào sẽ đổi thành `PENDING_CANCEL`.
    - Đơn `ĐÁ XONG`: Có nút `[Thanh toán nốt]`. Bấm vào sẽ mở luồng gọi API sang cổng VNPAY.

---

## 4. Phân rã Component & Luồng Trang Admin/Staff

### 4.1. Quản lý Đơn (UC11)
- **UI Logic:** Nơi nhân viên thu ngân túc trực liên tục để xử lý dòng chảy của khách.
- **Components cần thiết:**
  - `CreateWalkInModal`: Form tạo đơn cho khách vãng lai. NV chọn sân, giờ, nhập số tiền cọc (bằng 0 nếu đá luôn).
  - `BookingManagementTable`: 
    - Nút `[Duyệt Hủy]`: Dành cho đơn có trạng thái `PENDING_CANCEL`. Call API hoàn tiền rồi chuyển đơn thành `CANCELLED`.
    - Nút `[Thu tiền & Đóng ca]`: Dành cho đơn đang nợ tiền. Mở `CollectPaymentModal` (hỏi NV xác nhận khách đưa bao nhiêu tiền mặt).

### 4.2. Timeline Lịch sân (UC12)
- **UI Logic:** Bảng Gantt ngang giúp nhân viên nhìn bao quát sân nào đang có người chạy trên sân, sân nào sắp có khách tới.
- **Components cần thiết:**
  - `DailyTimelineGrid`: Tương tự bên Customer nhưng hiển thị chi tiết tên khách hàng thay vì chữ "Đã đặt".
  - Chạm vào đơn `SẮP ĐÁ`, có nút `[Nhận sân]`, đổi trạng thái đơn thành `IN_PROGRESS` (Đang đá).

### 4.3. Theo dõi Giao dịch (UC13)
- **UI Logic:** Báo cáo dòng tiền nhanh để giao ca/chốt ca.
- **Components cần thiết:**
  - `SummaryCards`: 3 thẻ to (Tổng VNPAY, Tổng Tiền Mặt, Tổng Hoàn Trả). Quan trọng nhất là Tổng Tiền Mặt.
  - `TransactionHistoryTable`: Danh sách Lịch sử thu chi chi tiết (`DEPOSIT`, `FINAL`, `REFUND`). Có filter lọc theo `CASH`.

### 4.4. Quản lý Bảng giá & Giờ vàng (UC16, UC17)
- **UI Logic:** Form nhập liệu cực kỳ nhạy cảm (ảnh hưởng trực tiếp doanh thu), cần Validate dữ liệu chặt chẽ bằng `Zod` hoặc `Yup`.
- **Components cần thiết:**
  - `TimeSlotForm`: Thêm sửa xóa ca đá (`start_time`, `end_time`, boolean `is_peak`).
  - `MatrixPricingTable`: Bảng nhập giá dựa trên (Loại sân 5/7) x (Giờ thường/Vàng).
  - `HolidayManager`: Thêm ngày (VD: 02/09) và `% phụ thu`.

### 4.5. Báo cáo thống kê (UC18)
- **UI Logic:** Dashboard trực quan.
- **Components cần thiết:**
  - Sử dụng thư viện `Recharts` hoặc `Chart.js` để vẽ `RevenueLineChart` (Doanh thu theo tháng).
  - Nút `[Xuất Excel]` gọi API trigger tải file `.xlsx`.

---

## 5. Kiến trúc State Management (Trạng thái) & API

Để React/TypeScript chạy mượt với nghiệp vụ phức tạp như trên, team Dev nên áp dụng các công cụ sau:

1. **Quản lý Auth State (Đăng nhập, Phân quyền):**
   - Sử dụng **Zustand** hoặc **Redux Toolkit**. 
   - State `useAuthStore` sẽ lưu `user`, `role`, và `token`.
   - Tạo Component `<ProtectedRoute allowedRoles={['ADMIN', 'STAFF']} />` bọc ngoài AdminLayout để chặn khách vãng lai.
2. **Quản lý API & Fetching (Tìm sân, Lấy đơn):**
   - BẮT BUỘC sử dụng **React Query (TanStack Query)** thay cho `useEffect` thuần.
   - Ứng dụng rất cần cơ chế *Auto-refetch* (VD: Nhân viên mở màn hình Quản lý đơn, nếu có khách đặt trên web, React Query sẽ tự làm mới danh sách mà NV không cần F5).
3. **Form & Validation:**
   - Dùng **React Hook Form** kết hợp **Zod** để bắt lỗi khi nhân viên nhập sai tiền cọc hoặc Admin nhập sai cấu hình giá.
4. **Định nghĩa TypeScript Interfaces:** (Cực kỳ quan trọng để frontend khớp với Backend)
   - Khai báo chuẩn `IBooking` chứa `pitchId`, `totalPrice`, `deposit`, `paymentStatus` (UNPAID, PAID), `bookingStatus` (CONFIRMED, IN_PROGRESS, PENDING_CANCEL...).
   - Khai báo chuẩn `ITransaction` chứa `amount`, `paymentMethod` (CASH, VNPAY).

*(Tài liệu này là bản lề để Leader chia task trên Jira cho các bạn Code React)*
