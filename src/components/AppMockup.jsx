import { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import logoUrl from "../assets/logo.png";

/* ─── helpers ─────────────────────────────────────── */
const uid = () => Math.random().toString(36).slice(2, 8);

const STATUS = {
	"Đã xác nhận": "bg-emerald-100 text-emerald-700",
	"Sắp tới": "bg-blue-100 text-blue-700",
	"Chờ xác nhận": "bg-amber-100 text-amber-700",
	"Đã hoàn thành": "bg-gray-100  text-gray-600",
	"Huỷ": "bg-red-100   text-red-600",
	"Cần thu": "bg-red-100   text-red-700",
	"Cần thu gấp": "bg-red-100   text-red-700",
	"Đã nhắc": "bg-blue-100  text-blue-700",
	"Đã thanh toán": "bg-emerald-100 text-emerald-700",
	"Sắp hết": "bg-amber-100 text-amber-700",
	"Sắp hết hạn": "bg-amber-100 text-amber-700",
	"Đủ hàng": "bg-emerald-100 text-emerald-700",
	"Còn nợ": "bg-red-100   text-red-700",
	"Bình thường": "bg-emerald-100 text-emerald-700",
	"Đã giao": "bg-emerald-100 text-emerald-700",
	"Đã đổi TK": "bg-blue-100  text-blue-700",
	"Đang giao": "bg-blue-100  text-blue-700",
	"Hết hàng": "bg-red-100   text-red-600",
	"Đang bán": "bg-emerald-100 text-emerald-700",
	"Sắp đến hạn": "bg-amber-100 text-amber-700",
	"Chờ duyệt": "bg-amber-100 text-amber-700",
	"Đã xử lý": "bg-emerald-100 text-emerald-700",
	"Đang xử lý": "bg-blue-100  text-blue-700",
	"Bật": "bg-emerald-100 text-emerald-700",
	"Tắt": "bg-gray-100  text-gray-500",
};

const Badge = ({ text }) => (
	<span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold whitespace-nowrap ${STATUS[text] ?? "bg-gray-100 text-gray-600"}`}>
		{text}
	</span>
);

const I = ({ d, className = "w-7 h-7" }) => (
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
		strokeWidth={1.5} stroke="currentColor" className={className}>
		<path strokeLinecap="round" strokeLinejoin="round" d={d} />
	</svg>
);

const ICONS = {
	spa: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z",
	box: "m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9",
	build: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z",
	key: "M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.169.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 0 1 21.75 8.25Z",
	globe: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418",
};

const APPS = [
	{
		id: "spa", name: "Spa Manager", sub: "Spa & Làm đẹp",
		from: "#7c3aed", to: "#a855f7", accent: "#7c3aed", iconKey: "spa",
		tabs: [
			{ key: "bookings", label: "Lịch hẹn", specific: true,
				cols: ["Khách hàng", "Dịch vụ", "Giờ hẹn", "Trạng thái"],
				rows: [
					{ id: "b1", "Khách hàng": "Nguyễn Thị Lan", "Dịch vụ": "Massage thư giãn 60'", "Giờ hẹn": "09:00", "Trạng thái": "Đã xác nhận" },
					{ id: "b2", "Khách hàng": "Trần Minh Châu", "Dịch vụ": "Chăm sóc da mặt", "Giờ hẹn": "10:30", "Trạng thái": "Sắp tới" },
					{ id: "b3", "Khách hàng": "Lê Hoàng Yến", "Dịch vụ": "Nail art phong thuỷ", "Giờ hẹn": "14:00", "Trạng thái": "Chờ xác nhận" },
				],
				fields: [
					{ key: "Khách hàng", label: "Khách hàng", type: "text", ph: "Tên khách" },
					{ key: "Dịch vụ", label: "Dịch vụ", type: "text", ph: "VD: Massage 60'" },
					{ key: "Giờ hẹn", label: "Giờ hẹn", type: "text", ph: "VD: 09:00" },
					{ key: "Trạng thái", label: "Trạng thái", type: "select", opts: ["Sắp tới", "Đã xác nhận", "Chờ xác nhận", "Đã hoàn thành", "Huỷ"] },
				],
			},
			{ key: "customers", label: "Khách hàng",
				cols: ["Tên khách", "SĐT", "Lần cuối đến", "Tổng chi"],
				rows: [
					{ id: "c1", "Tên khách": "Nguyễn Thị Lan", "SĐT": "0901 234 567", "Lần cuối đến": "08/04/2026", "Tổng chi": "4,500,000đ" },
					{ id: "c2", "Tên khách": "Trần Minh Châu", "SĐT": "0912 345 678", "Lần cuối đến": "05/04/2026", "Tổng chi": "2,200,000đ" },
					{ id: "c3", "Tên khách": "Phạm Bảo Anh", "SĐT": "0987 654 321", "Lần cuối đến": "01/04/2026", "Tổng chi": "8,100,000đ" },
				],
				fields: [
					{ key: "Tên khách", label: "Tên khách hàng", type: "text", ph: "Nhập tên" },
					{ key: "SĐT", label: "Số điện thoại", type: "text", ph: "0xxx xxx xxx" },
					{ key: "Lần cuối đến", label: "Lần cuối đến", type: "text", ph: "DD/MM/YYYY" },
					{ key: "Tổng chi", label: "Tổng chi tiêu", type: "text", ph: "VD: 1,000,000đ" },
				],
			},
			{ key: "debt", label: "Công nợ KH", specific: true,
				cols: ["Khách hàng", "Số nợ", "Đến hạn", "Trạng thái"],
				rows: [
					{ id: "d1", "Khách hàng": "Lê Hoàng Yến", "Số nợ": "350,000đ", "Đến hạn": "10/04/2026", "Trạng thái": "Cần thu" },
					{ id: "d2", "Khách hàng": "Phạm Bảo Anh", "Số nợ": "1,200,000đ", "Đến hạn": "15/04/2026", "Trạng thái": "Đã nhắc" },
				],
				fields: [
					{ key: "Khách hàng", label: "Khách hàng", type: "text", ph: "Tên khách" },
					{ key: "Số nợ", label: "Số nợ", type: "text", ph: "VD: 500,000đ" },
					{ key: "Đến hạn", label: "Đến hạn", type: "text", ph: "DD/MM/YYYY" },
					{ key: "Trạng thái", label: "Trạng thái", type: "select", opts: ["Cần thu", "Đã nhắc", "Đã thanh toán"] },
				],
			},
		],
	},
	{
		id: "inventory", name: "Kho Manager", sub: "Quản lý Kho hàng",
		from: "#0071e3", to: "#38bdf8", accent: "#0071e3", iconKey: "box",
		tabs: [
			{ key: "stock", label: "Tồn kho",
				cols: ["Mặt hàng", "Đơn vị", "Tồn kho", "Trạng thái"],
				rows: [
					{ id: "s1", "Mặt hàng": "Vải cotton trắng", "Đơn vị": "cuộn", "Tồn kho": "4", "Trạng thái": "Sắp hết" },
					{ id: "s2", "Mặt hàng": "Thùng carton", "Đơn vị": "cái", "Tồn kho": "10", "Trạng thái": "Sắp hết" },
					{ id: "s3", "Mặt hàng": "Sắt phi 8", "Đơn vị": "kg", "Tồn kho": "120", "Trạng thái": "Đủ hàng" },
				],
				fields: [
					{ key: "Mặt hàng", label: "Mặt hàng", type: "text", ph: "Tên mặt hàng" },
					{ key: "Đơn vị", label: "Đơn vị", type: "text", ph: "kg, cái, cuộn..." },
					{ key: "Tồn kho", label: "Số lượng", type: "text", ph: "Nhập số" },
					{ key: "Trạng thái", label: "Trạng thái", type: "select", opts: ["Đủ hàng", "Sắp hết", "Hết hàng"] },
				],
			},
			{ key: "import", label: "Nhập hàng",
				cols: ["Nhà cung cấp", "Mặt hàng", "Số lượng", "Ngày nhập"],
				rows: [
					{ id: "i1", "Nhà cung cấp": "NCC Minh Đức", "Mặt hàng": "Vải cotton", "Số lượng": "50 cuộn", "Ngày nhập": "07/04/2026" },
					{ id: "i2", "Nhà cung cấp": "NCC Bình Dương", "Mặt hàng": "Sắt phi 8", "Số lượng": "500 kg", "Ngày nhập": "05/04/2026" },
				],
				fields: [
					{ key: "Nhà cung cấp", label: "Nhà cung cấp", type: "text", ph: "Tên NCC" },
					{ key: "Mặt hàng", label: "Mặt hàng", type: "text", ph: "Tên hàng" },
					{ key: "Số lượng", label: "Số lượng", type: "text", ph: "VD: 100 kg" },
					{ key: "Ngày nhập", label: "Ngày nhập", type: "text", ph: "DD/MM/YYYY" },
				],
			},
			{ key: "supplier", label: "Nhà cung cấp", specific: true,
				cols: ["Tên NCC", "SĐT", "Công nợ", "Trạng thái"],
				rows: [
					{ id: "sp1", "Tên NCC": "NCC Minh Đức", "SĐT": "0911 111 111", "Công nợ": "0đ", "Trạng thái": "Đã thanh toán" },
					{ id: "sp2", "Tên NCC": "NCC Bình Dương", "SĐT": "0922 222 222", "Công nợ": "8,500,000đ", "Trạng thái": "Còn nợ" },
				],
				fields: [
					{ key: "Tên NCC", label: "Tên nhà cung cấp", type: "text", ph: "Tên NCC" },
					{ key: "SĐT", label: "Số điện thoại", type: "text", ph: "0xxx xxx xxx" },
					{ key: "Công nợ", label: "Công nợ", type: "text", ph: "VD: 0đ" },
					{ key: "Trạng thái", label: "Trạng thái", type: "select", opts: ["Đã thanh toán", "Còn nợ"] },
				],
			},
		],
	},
	{
		id: "construction", name: "Vật Liệu XD", sub: "Vật liệu xây dựng",
		from: "#d97706", to: "#f59e0b", accent: "#d97706", iconKey: "build",
		tabs: [
			{ key: "quote", label: "Báo giá CT", specific: true,
				cols: ["Công trình", "Khách hàng", "Giá trị", "Trạng thái"],
				rows: [
					{ id: "q1", "Công trình": "CT Lê Văn Sỹ Q7", "Khách hàng": "Ông Tuấn", "Giá trị": "97,500,000đ", "Trạng thái": "Chờ duyệt" },
					{ id: "q2", "Công trình": "CT Bình Thạnh", "Khách hàng": "Bà Hoa", "Giá trị": "42,000,000đ", "Trạng thái": "Đã xác nhận" },
				],
				fields: [
					{ key: "Công trình", label: "Tên công trình", type: "text", ph: "Tên & địa chỉ CT" },
					{ key: "Khách hàng", label: "Khách hàng", type: "text", ph: "Tên chủ đầu tư" },
					{ key: "Giá trị", label: "Giá trị báo giá", type: "text", ph: "VD: 50,000,000đ" },
					{ key: "Trạng thái", label: "Trạng thái", type: "select", opts: ["Chờ duyệt", "Đã xác nhận", "Đã ký HĐ", "Huỷ"] },
				],
			},
			{ key: "material", label: "Kho vật liệu",
				cols: ["Vật liệu", "Đơn vị", "Tồn kho", "Đơn giá"],
				rows: [
					{ id: "m1", "Vật liệu": "Xi măng Hà Tiên", "Đơn vị": "bao", "Tồn kho": "1,200", "Đơn giá": "85,000đ" },
					{ id: "m2", "Vật liệu": "Sắt phi 8", "Đơn vị": "kg", "Tồn kho": "2,500", "Đơn giá": "18,000đ" },
					{ id: "m3", "Vật liệu": "Gạch ốp lát", "Đơn vị": "m²", "Tồn kho": "800", "Đơn giá": "95,000đ" },
				],
				fields: [
					{ key: "Vật liệu", label: "Tên vật liệu", type: "text", ph: "VD: Xi măng" },
					{ key: "Đơn vị", label: "Đơn vị", type: "text", ph: "bao, kg, m²..." },
					{ key: "Tồn kho", label: "Số lượng tồn", type: "text", ph: "Nhập số" },
					{ key: "Đơn giá", label: "Đơn giá", type: "text", ph: "VD: 85,000đ" },
				],
			},
			{ key: "dealer", label: "Công nợ ĐL", specific: true,
				cols: ["Đại lý", "Số nợ", "Đến hạn", "Trạng thái"],
				rows: [
					{ id: "dl1", "Đại lý": "Đại lý Nam Phát", "Số nợ": "45,000,000đ", "Đến hạn": "01/04/2026", "Trạng thái": "Cần thu gấp" },
					{ id: "dl2", "Đại lý": "Đại lý Thành Tâm", "Số nợ": "12,500,000đ", "Đến hạn": "13/04/2026", "Trạng thái": "Sắp đến hạn" },
				],
				fields: [
					{ key: "Đại lý", label: "Tên đại lý", type: "text", ph: "Tên đại lý" },
					{ key: "Số nợ", label: "Số nợ", type: "text", ph: "VD: 10,000,000đ" },
					{ key: "Đến hạn", label: "Ngày đến hạn", type: "text", ph: "DD/MM/YYYY" },
					{ key: "Trạng thái", label: "Trạng thái", type: "select", opts: ["Sắp đến hạn", "Cần thu gấp", "Đã thanh toán"] },
				],
			},
		],
	},
	{
		id: "accounts", name: "Keys Manager", sub: "Bán tài khoản số",
		from: "#4f46e5", to: "#818cf8", accent: "#4f46e5", iconKey: "key",
		tabs: [
			{ key: "stock", label: "Kho tài khoản", specific: true,
				cols: ["Sản phẩm", "Kho (TK)", "HSD còn lại", "Trạng thái"],
				rows: [
					{ id: "k1", "Sản phẩm": "Netflix 4K", "Kho (TK)": "45", "HSD còn lại": "18 ngày", "Trạng thái": "Bình thường" },
					{ id: "k2", "Sản phẩm": "Spotify Premium", "Kho (TK)": "23", "HSD còn lại": "5 ngày", "Trạng thái": "Sắp hết hạn" },
					{ id: "k3", "Sản phẩm": "Office 365", "Kho (TK)": "50", "HSD còn lại": "28 ngày", "Trạng thái": "Bình thường" },
				],
				fields: [
					{ key: "Sản phẩm", label: "Tên sản phẩm", type: "text", ph: "VD: Netflix 4K" },
					{ key: "Kho (TK)", label: "Số tài khoản", type: "text", ph: "Nhập số" },
					{ key: "HSD còn lại", label: "HSD còn lại", type: "text", ph: "VD: 30 ngày" },
					{ key: "Trạng thái", label: "Trạng thái", type: "select", opts: ["Bình thường", "Sắp hết hạn", "Hết hàng"] },
				],
			},
			{ key: "orders", label: "Đơn hàng",
				cols: ["Khách hàng", "Sản phẩm", "Số lượng", "Trạng thái"],
				rows: [
					{ id: "o1", "Khách hàng": "Lê Văn A", "Sản phẩm": "Netflix 4K", "Số lượng": "3", "Trạng thái": "Đã giao" },
					{ id: "o2", "Khách hàng": "Bùi Thị B", "Sản phẩm": "Spotify", "Số lượng": "1", "Trạng thái": "Đang giao" },
					{ id: "o3", "Khách hàng": "Hồ Văn C", "Sản phẩm": "Office 365", "Số lượng": "2", "Trạng thái": "Đang xử lý" },
				],
				fields: [
					{ key: "Khách hàng", label: "Khách hàng", type: "text", ph: "Tên khách" },
					{ key: "Sản phẩm", label: "Sản phẩm", type: "text", ph: "Tên sản phẩm" },
					{ key: "Số lượng", label: "Số lượng", type: "text", ph: "Nhập số" },
					{ key: "Trạng thái", label: "Trạng thái", type: "select", opts: ["Đang xử lý", "Đang giao", "Đã giao", "Đã huỷ"] },
				],
			},
			{ key: "warranty", label: "Bảo hành & đổi TK", specific: true,
				cols: ["Đơn hàng", "Sản phẩm", "Vấn đề", "Trạng thái"],
				rows: [
					{ id: "w1", "Đơn hàng": "#8019", "Sản phẩm": "Adobe CC", "Vấn đề": "TK bị lỗi đăng nhập", "Trạng thái": "Đã xử lý" },
					{ id: "w2", "Đơn hàng": "#8023", "Sản phẩm": "Netflix 4K", "Vấn đề": "TK bị khoá", "Trạng thái": "Đang xử lý" },
				],
				fields: [
					{ key: "Đơn hàng", label: "Mã đơn hàng", type: "text", ph: "#xxxx" },
					{ key: "Sản phẩm", label: "Sản phẩm", type: "text", ph: "Tên sản phẩm" },
					{ key: "Vấn đề", label: "Mô tả vấn đề", type: "text", ph: "Nhập mô tả" },
					{ key: "Trạng thái", label: "Trạng thái", type: "select", opts: ["Đang xử lý", "Đã xử lý", "Đã đổi TK"] },
				],
			},
		],
	},
	{
		id: "digital", name: "Digital Shop", sub: "Cửa hàng số",
		from: "#059669", to: "#34d399", accent: "#059669", iconKey: "globe",
		tabs: [
			{ key: "products", label: "Sản phẩm số", specific: true,
				cols: ["Sản phẩm", "Định dạng", "Giá bán", "Trạng thái"],
				rows: [
					{ id: "p1", "Sản phẩm": "Ebook Marketing 2024", "Định dạng": "PDF", "Giá bán": "149,000đ", "Trạng thái": "Đang bán" },
					{ id: "p2", "Sản phẩm": "Khóa học React Pro", "Định dạng": "Video", "Giá bán": "899,000đ", "Trạng thái": "Đang bán" },
					{ id: "p3", "Sản phẩm": "Template Figma UI", "Định dạng": "ZIP", "Giá bán": "299,000đ", "Trạng thái": "Hết hàng" },
				],
				fields: [
					{ key: "Sản phẩm", label: "Tên sản phẩm", type: "text", ph: "Tên SP số" },
					{ key: "Định dạng", label: "Định dạng", type: "select", opts: ["PDF", "Video", "ZIP", "Link", "Khác"] },
					{ key: "Giá bán", label: "Giá bán", type: "text", ph: "VD: 199,000đ" },
					{ key: "Trạng thái", label: "Trạng thái", type: "select", opts: ["Đang bán", "Hết hàng", "Tạm ngừng"] },
				],
			},
			{ key: "orders", label: "Đơn hàng",
				cols: ["Khách", "Sản phẩm", "Kênh giao", "Trạng thái"],
				rows: [
					{ id: "o1", "Khách": "Phạm Văn A", "Sản phẩm": "Ebook Marketing", "Kênh giao": "Email tự động", "Trạng thái": "Đã giao" },
					{ id: "o2", "Khách": "Trần Thị B", "Sản phẩm": "React Pro", "Kênh giao": "Zalo tự động", "Trạng thái": "Đang giao" },
				],
				fields: [
					{ key: "Khách", label: "Tên khách", type: "text", ph: "Tên khách hàng" },
					{ key: "Sản phẩm", label: "Sản phẩm", type: "text", ph: "Tên SP" },
					{ key: "Kênh giao", label: "Kênh giao", type: "select", opts: ["Email tự động", "Zalo tự động", "Thủ công"] },
					{ key: "Trạng thái", label: "Trạng thái", type: "select", opts: ["Đang giao", "Đã giao", "Lỗi giao"] },
				],
			},
			{ key: "auto", label: "Tự động hoá", specific: true,
				cols: ["Tên quy tắc", "Khi nào", "Hành động", "Trạng thái"],
				rows: [
					{ id: "a1", "Tên quy tắc": "Giao ebook", "Khi nào": "Thanh toán thành công", "Hành động": "Gửi file qua Email", "Trạng thái": "Bật" },
					{ id: "a2", "Tên quy tắc": "Nhắc khoá học", "Khi nào": "Sau 3 ngày mua", "Hành động": "Zalo reminder", "Trạng thái": "Bật" },
					{ id: "a3", "Tên quy tắc": "Xác nhận đơn", "Khi nào": "Đơn mới tạo", "Hành động": "Email xác nhận", "Trạng thái": "Tắt" },
				],
				fields: [
					{ key: "Tên quy tắc", label: "Tên quy tắc", type: "text", ph: "Đặt tên dễ nhớ" },
					{ key: "Khi nào", label: "Điều kiện", type: "text", ph: "VD: Sau khi thanh toán" },
					{ key: "Hành động", label: "Hành động", type: "text", ph: "VD: Gửi email" },
					{ key: "Trạng thái", label: "Trạng thái", type: "select", opts: ["Bật", "Tắt"] },
				],
			},
		],
	},
];

const buildState = () => {
	const s = {};
	APPS.forEach(app => {
		s[app.id] = {};
		app.tabs.forEach(tab => { s[app.id][tab.key] = tab.rows.map(r => ({ ...r })); });
	});
	return s;
};

/* ── FormPanel ───────────────────────────────────── */
const FormPanel = ({ fields, initial, accent, title, onSave, onCancel }) => {
	const [vals, setVals] = useState(() => {
		const v = {};
		fields.forEach(f => { v[f.key] = initial?.[f.key] ?? ""; });
		return v;
	});
	const set = (k, v) => setVals(p => ({ ...p, [k]: v }));

	return (
		<div className="flex h-full flex-col bg-white">
			<div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
				<p className="text-xs font-bold text-gray-700">{title}</p>
				<button onClick={onCancel} className="rounded-lg p-1 text-gray-400 hover:bg-gray-200">
					<svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
						<path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
					</svg>
				</button>
			</div>
			<div className="flex-1 overflow-y-auto p-4 space-y-3">
				{fields.map(f => (
					<div key={f.key}>
						<label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">{f.label}</label>
						{f.type === "select"
							? <select value={vals[f.key]} onChange={e => set(f.key, e.target.value)}
								className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800 shadow-sm outline-none focus:ring-2" style={{ "--tw-ring-color": accent }}>
								<option value="">-- Chọn --</option>
								{f.opts.map(o => <option key={o}>{o}</option>)}
							</select>
							: <input type="text" value={vals[f.key]} placeholder={f.ph}
								onChange={e => set(f.key, e.target.value)}
								className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800 shadow-sm placeholder-gray-400 outline-none focus:ring-2" />
						}
					</div>
				))}
			</div>
			<div className="flex gap-2 border-t border-gray-200 bg-gray-50 px-4 py-3">
				<button onClick={() => onSave(vals)}
					className="flex-1 rounded-xl py-2 text-xs font-bold text-white shadow transition-opacity hover:opacity-90"
					style={{ background: `linear-gradient(135deg,${accent},${accent}cc)` }}>
					Lưu lại
				</button>
				<button onClick={onCancel} className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100">Huỷ</button>
			</div>
		</div>
	);
};

/* ── DataTable ───────────────────────────────────── */
const DataTable = ({ tab, rows, accent, onEdit, onDelete }) => (
	<div className="flex-1 overflow-auto bg-gray-50">
		<table className="w-full min-w-max text-left">
			<thead className="sticky top-0 z-10">
				<tr className="border-b-2 border-gray-200 bg-gray-100">
					{tab.cols.map(c => (
						<th key={c} className="px-3 py-2.5 text-[9px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">{c}</th>
					))}
					<th className="px-3 py-2.5 text-[9px] font-bold uppercase tracking-wider text-gray-500 text-right">Thao tác</th>
				</tr>
			</thead>
			<tbody>
				{rows.length === 0 && (
					<tr><td colSpan={tab.cols.length + 1} className="py-8 text-center text-[10px] text-gray-400">Chưa có dữ liệu — nhấn "+ Thêm mới"</td></tr>
				)}
				{rows.map((row, i) => (
					<tr key={row.id} className={`border-b border-gray-200 transition-colors hover:bg-blue-50/60 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/80"}`}>
						{tab.cols.map((col, ci) => (
							<td key={col} className="px-3 py-2.5">
								{ci === tab.cols.length - 1
									? <Badge text={row[col]} />
									: <span className="text-[11px] font-medium text-gray-700 whitespace-nowrap">{row[col]}</span>
								}
							</td>
						))}
						<td className="px-3 py-2.5 text-right">
							<div className="flex items-center justify-end gap-1">
								<button onClick={() => onEdit(row)}
									className="rounded-lg px-2 py-1 text-[9px] font-bold text-white shadow-sm transition hover:opacity-80"
									style={{ background: accent }}>Sửa</button>
								<button onClick={() => onDelete(row.id)}
									className="rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[9px] font-bold text-red-500 hover:bg-red-100">Xóa</button>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

/* ── AppWindow ───────────────────────────────────── */
const AppWindow = ({ app, tabData, onClose, onAdd, onUpdate, onDelete }) => {
	const [activeKey, setActiveKey] = useState(app.tabs[0].key);
	const [form, setForm] = useState(null);
	const [isClosing, setIsClosing] = useState(false);

	const requestClose = useCallback(() => {
		if (isClosing) return;
		setIsClosing(true);
		setTimeout(onClose, 240);
	}, [isClosing, onClose]);

	const activeTab = app.tabs.find(t => t.key === activeKey);
	const rows = tabData[activeKey] ?? [];

	const handleSave = (vals) => {
		if (form.mode === "add") onAdd(app.id, activeKey, { ...vals, id: uid() });
		else onUpdate(app.id, activeKey, form.item.id, vals);
		setForm(null);
	};

	const origin = app.originX != null ? `${app.originX}% ${app.originY}%` : "50% 85%";

	return (
		<div
			className="absolute inset-1 z-20 flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_30px_80px_-10px_rgba(0,0,0,0.5)]"
			style={{
				border: "1px solid rgba(255,255,255,0.15)",
				transformOrigin: origin,
				willChange: "transform, opacity",
				/* "both" applies 0% keyframe BEFORE first paint → no flash at full scale */
				animation: isClosing
					? "macos-close 0.24s cubic-bezier(0.4, 0, 1, 1) both"
					: "macos-open  0.38s cubic-bezier(0.34, 1.08, 0.64, 1) both",
			}}>
			{/* Title bar */}
			<div className="flex shrink-0 items-center gap-2 border-b border-gray-200 bg-[#f0f0f0] px-4 py-2">
				<button onClick={requestClose} className="h-3.5 w-3.5 rounded-full bg-[#ff5f57] shadow-inner transition hover:brightness-90" />
				<span className="h-3.5 w-3.5 rounded-full bg-[#febc2e] shadow-inner" />
				<span className="h-3.5 w-3.5 rounded-full bg-[#28c840] shadow-inner" />
				<div className="mx-auto flex items-center gap-1.5">
					<div className="flex h-4 w-4 items-center justify-center rounded" style={{ background: `linear-gradient(135deg,${app.from},${app.to})` }}>
						<I d={ICONS[app.iconKey]} className="h-2.5 w-2.5 text-white" />
					</div>
					<span className="text-[11px] font-semibold text-gray-600">{app.name}</span>
				</div>
				<span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-600">
					<span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />Online
				</span>
			</div>

			{/* Body */}
			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar */}
				<div className="hidden w-36 shrink-0 flex-col border-r border-gray-200 bg-[#f6f6f6] p-2.5 sm:flex">
					<p className="mb-2 px-2 text-[8px] font-bold uppercase tracking-widest text-gray-400">{app.sub}</p>
					{app.tabs.map(tab => (
						<button key={tab.key} onClick={() => { setActiveKey(tab.key); setForm(null); }}
							className={`mb-0.5 flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-[11px] font-medium transition-all ${
								tab.key === activeKey
									? "text-white shadow-sm"
									: tab.specific
										? "bg-white text-gray-700 shadow-sm ring-1 ring-gray-200 hover:shadow-md"
										: "text-gray-500 hover:bg-white hover:text-gray-700"
							}`}
							style={tab.key === activeKey ? { background: `linear-gradient(135deg,${app.from},${app.to})` } : {}}
						>
							<span className="truncate">{tab.label}</span>
							{tab.specific && tab.key !== activeKey && <span className="ml-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: app.accent }} />}
						</button>
					))}
					<div className="mt-auto rounded-lg border border-dashed p-2" style={{ borderColor: `${app.accent}60` }}>
						<p className="text-[8px] leading-snug" style={{ color: app.accent }}>★ Tính năng đặc thù ngành</p>
					</div>
				</div>

				{/* Content */}
				<div className="flex flex-1 flex-col overflow-hidden">
					{form ? (
						<FormPanel fields={activeTab.fields} initial={form.item} accent={app.accent}
							title={form.mode === "add" ? `+ Thêm ${activeTab.label}` : `Sửa ${activeTab.label}`}
							onSave={handleSave} onCancel={() => setForm(null)} />
					) : (
						<>
							<div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5">
								<div>
									<p className="text-xs font-bold text-gray-800">{activeTab.label}</p>
									<p className="text-[9px] text-gray-400">{rows.length} bản ghi{activeTab.specific ? " · Tính năng đặc thù ngành" : ""}</p>
								</div>
								<button onClick={() => setForm({ mode: "add", item: null })}
									className="flex items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-bold text-white shadow transition-opacity hover:opacity-80"
									style={{ background: `linear-gradient(135deg,${app.from},${app.to})` }}>
									<svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
										<path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
									</svg>
									Thêm mới
								</button>
							</div>
							<DataTable tab={activeTab} rows={rows} accent={app.accent}
								onEdit={row => setForm({ mode: "edit", item: row })}
								onDelete={id => onDelete(app.id, activeKey, id)} />
						</>
					)}
				</div>
			</div>
		</div>
	);
};

/* ── Dock ────────────────────────────────────────── */
const Dock = ({ apps, openId, onOpen }) => (
	<div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2">
		<div className="flex items-end gap-2 rounded-2xl border border-white/20 bg-white/15 px-3 py-2 shadow-xl backdrop-blur-xl">
			{apps.map(app => (
				<div key={app.id} className="group relative flex flex-col items-center">
					<button onClick={(e) => onOpen(app, e.currentTarget)}
						className="flex h-10 w-10 items-center justify-center rounded-xl shadow-lg"
						style={{ background: `linear-gradient(145deg,${app.from},${app.to})` }}>
						<I d={ICONS[app.iconKey]} className="h-5 w-5 text-white" />
					</button>
					{openId === app.id && <span className="mt-1 h-1 w-1 rounded-full bg-white/80" />}
					<span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/70 px-2 py-0.5 text-[9px] font-medium text-white opacity-0 transition group-hover:opacity-100">
						{app.name}
					</span>
				</div>
			))}
			<div className="mx-1 h-8 w-px bg-white/20" />
			<div className="group relative flex flex-col items-center">
				<button onClick={() => window.location.hash = "#cta"}
					className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-dashed border-white/40 group-hover:bg-white/20">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="h-5 w-5 opacity-70">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
				</button>
				<span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/70 px-2 py-0.5 text-[9px] font-medium text-white opacity-0 transition group-hover:opacity-100">
					Yêu cầu riêng
				</span>
			</div>
		</div>
	</div>
);

/* ── LockScreen ──────────────────────────────────── */
const LockScreen = ({ onUnlock }) => {
	const [dragPx, setDragPx] = useState(0);
	const [dragging, setDragging] = useState(false);
	const [unlocking, setUnlocking] = useState(false);
	const trackRef = useRef(null);
	const startClientX = useRef(0);
	const startDragPx = useRef(0);
	const KNOB = 34;

	const now = new Date();
	const hh = String(now.getHours()).padStart(2, "0");
	const mm = String(now.getMinutes()).padStart(2, "0");
	const dateStr = now.toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long" });

	const getMax = () => (trackRef.current ? trackRef.current.clientWidth - KNOB - 8 : 160);

	const trigger = () => {
		if (unlocking) return;
		setDragPx(getMax());
		setUnlocking(true);
		setTimeout(onUnlock, 600);
	};

	const onPointerDown = (e) => {
		if (unlocking) return;
		setDragging(true);
		startClientX.current = e.clientX;
		startDragPx.current = dragPx;
		e.currentTarget.setPointerCapture(e.pointerId);
	};

	const onPointerMove = (e) => {
		if (!dragging || unlocking) return;
		const max = getMax();
		const newDrag = Math.max(0, Math.min(startDragPx.current + (e.clientX - startClientX.current), max));
		setDragPx(newDrag);
		if (newDrag >= max - 2) trigger();
	};

	const onPointerUp = () => {
		if (!dragging) return;
		setDragging(false);
		if (!unlocking) setDragPx(0);
	};

	const progress = dragPx / Math.max(getMax(), 1);

	return (
		<div
			className="absolute inset-0 z-30 flex flex-col items-center select-none overflow-hidden"
			style={{
				backgroundColor: "#0d1929",
				backgroundImage: "url('https://vmstyle.vn/wp-content/uploads/2025/10/hinh-nen-5k-macos-sierra-nui-tuyet-tong-lanh.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				opacity: unlocking ? 0 : 1,
				transform: unlocking ? "scale(1.06)" : "scale(1)",
				transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)",
				pointerEvents: unlocking ? "none" : "auto",
			}}
		>
			{/* Frosted dark overlay */}
			<div className="absolute inset-0 bg-black/25" />

			{/* Clock */}
			<div className="relative z-10 mt-7 flex flex-col items-center text-white drop-shadow-xl">
				<p
					className="font-thin leading-none tracking-tight tabular-nums"
					style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
				>
					{hh}:{mm}
				</p>
				<p className="mt-0.5 text-[8.5px] font-medium capitalize tracking-wide opacity-75" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
					{dateStr}
				</p>
			</div>

			{/* Center logo */}
			<div className="relative z-10 mt-auto mb-auto flex flex-col items-center gap-2">
				<div className="h-16 w-16 rounded-full overflow-hidden shadow-2xl"
					style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.35)" }}
				>
					<img src={logoUrl} alt="TechMin" className="h-full w-full object-cover" />
				</div>
				<div className="flex flex-col items-center leading-none">
					<p className="text-[15px] font-semibold tracking-tight text-white drop-shadow-lg">
						TechMin<span style={{ color: "#60aaff" }}>.</span>
					</p>
					<p className="mt-0.5 text-[7.5px] font-semibold uppercase tracking-[0.2em] text-white/50">
						Software
					</p>
				</div>
			</div>

			{/* Swipe-to-unlock bar */}
			<div className="relative z-10 mb-5 w-[80%]">
				<div
					ref={trackRef}
					className="relative h-[34px] overflow-hidden rounded-full border border-white/25 bg-white/14 backdrop-blur-md"
				>
					{/* Progress fill */}
					<div
						className="absolute inset-y-0 left-0 rounded-full"
						style={{
							width: `${dragPx + KNOB + 4}px`,
							background: `rgba(0,113,227,${0.25 + progress * 0.45})`,
							transition: dragging ? "none" : "width 0.4s cubic-bezier(0.22,1,0.36,1)",
						}}
					/>
					{/* Label */}
					<p
						className="pointer-events-none absolute inset-0 flex items-center justify-center text-[8.5px] font-semibold tracking-[0.22em] text-white/60 select-none"
						style={{ opacity: Math.max(0, 1 - progress * 3) }}
					>
						VUỐT ĐỂ MỞ →
					</p>
					{/* Unlocked label */}
					<p
						className="pointer-events-none absolute inset-0 flex items-center justify-center text-[8.5px] font-bold tracking-wider text-white select-none"
						style={{ opacity: Math.max(0, (progress - 0.75) * 4) }}
					>
						✓ Đã mở khoá
					</p>
					{/* Knob */}
					<div
						className="absolute top-[2px] flex items-center justify-center rounded-full bg-white shadow-lg"
						style={{
							left: `${dragPx + 2}px`,
							width: `${KNOB}px`,
							height: `${KNOB - 4}px`,
							cursor: dragging ? "grabbing" : "grab",
							transition: dragging ? "none" : "left 0.4s cubic-bezier(0.22,1,0.36,1)",
							touchAction: "none",
						}}
						onPointerDown={onPointerDown}
						onPointerMove={onPointerMove}
						onPointerUp={onPointerUp}
						onPointerCancel={onPointerUp}
					>
						{progress > 0.85
							? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#0071e3" className="h-3 w-3"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
							: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#0071e3" className="h-3 w-3"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
						}
					</div>
				</div>
			</div>
		</div>
	);
};

/* ── Desktop ─────────────────────────────────────── */
const Desktop = ({ apps, onOpen, clickingAppId, onExpand }) => {
	const now = new Date();
	const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
	return (
		<div className="absolute inset-0 flex flex-col">
			{/* Wallpaper */}
			<div className="absolute inset-0" style={{ backgroundColor: "#0d1929", backgroundImage: "url('https://vmstyle.vn/wp-content/uploads/2025/10/hinh-nen-5k-macos-sierra-nui-tuyet-tong-lanh.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />

			{/* macOS menu bar */}
			<div className="relative z-10 flex shrink-0 items-center justify-between border-b border-white/10 bg-black/30 px-4 py-1.5 backdrop-blur-md">
				<div className="flex items-center gap-4 text-[11px]">
					<span className="font-bold text-white/90">TechMin</span>
					{["Finder", "File", "Xem", "Go", "Window"].map(m => <span key={m} className="text-white/50">{m}</span>)}
				</div>
				<div className="flex items-center gap-3 text-[10px] text-white/60">
					<svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 opacity-60">
						<path fillRule="evenodd" d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-3.515-3.515-9.216-3.515-12.73 0a.75.75 0 0 1-1.061 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.204 3.182a6 6 0 0 1 8.486 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0 3.75 3.75 0 0 0-5.303 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.061Z" clipRule="evenodd" />
					</svg>
					<span className="font-medium">{time}</span>
					{/* Expand button */}
					<button
						onClick={onExpand}
						title="Mở rộng màn hình"
						className="rounded p-0.5 opacity-60 transition-all hover:opacity-100 hover:bg-white/20 active:scale-90"
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="h-3 w-3">
							<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
						</svg>
					</button>
				</div>
			</div>

			{/* Desktop icons */}
			<div className="relative z-10 flex flex-1 flex-wrap content-start gap-3 p-4 pb-20">
				{apps.map(app => (
					<button key={app.id} onClick={(e) => onOpen(app, e.currentTarget)}
						className="group flex w-[68px] flex-col items-center gap-1.5 rounded-xl p-2 transition-colors hover:bg-white/10 active:scale-95"
						style={{
							animation: clickingAppId === app.id
								? "icon-launch 0.32s cubic-bezier(0.36,0.07,0.19,0.97) forwards"
								: "none",
						}}
					>
						<div
							className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg shadow-black/30 transition-transform duration-150 group-hover:scale-105"
							style={{
								background: `linear-gradient(145deg,${app.from},${app.to})`,
								boxShadow: clickingAppId === app.id
									? `0 0 0 3px rgba(255,255,255,0.6), 0 8px 24px ${app.from}88`
									: undefined,
							}}
						>
							<I d={ICONS[app.iconKey]} className="h-6 w-6 text-white" />
						</div>
						<span className="text-center text-[9px] font-medium leading-tight text-white/90 drop-shadow">{app.name}</span>
					</button>
				))}
			</div>

			<p className="absolute bottom-16 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-[9px] text-white/30">
				Nhấn vào app để mở & trải nghiệm tính năng đặc thù — chỉ có tại TechMin.
			</p>
		</div>
	);
};

/* ── Main ────────────────────────────────────────── */
export default function AppMockup() {
	const [locked, setLocked] = useState(true);
	const [data, setData] = useState(buildState);
	const [openApp, setOpenApp] = useState(null);
	const [clickingAppId, setClickingAppId] = useState(null);
	const [expanded, setExpanded] = useState(false);

	/* Animated open: icon bounces → window zooms from icon position */
	const handleOpen = useCallback((app, iconEl) => {
		setClickingAppId(app.id);

		let originX = 50, originY = 85;
		if (iconEl) {
			const container = iconEl.closest("[data-mockup-root]");
			if (container) {
				const ir = iconEl.getBoundingClientRect();
				const cr = container.getBoundingClientRect();
				originX = ((ir.left + ir.width / 2 - cr.left) / cr.width) * 100;
				originY = ((ir.top + ir.height / 2 - cr.top) / cr.height) * 100;
			}
		}

		setClickingAppId(null);
		setOpenApp({ ...app, originX, originY });
	}, []);

	const handleClose = useCallback(() => setOpenApp(null), []);
	const addRow    = useCallback((a, t, r)    => setData(p => ({ ...p, [a]: { ...p[a], [t]: [...p[a][t], r] } })), []);
	const updateRow = useCallback((a, t, id, v) => setData(p => ({ ...p, [a]: { ...p[a], [t]: p[a][t].map(r => r.id === id ? { ...r, ...v } : r) } })), []);
	const deleteRow = useCallback((a, t, id)    => setData(p => ({ ...p, [a]: { ...p[a], [t]: p[a][t].filter(r => r.id !== id) } })), []);

	/* ESC closes fullscreen */
	useEffect(() => {
		const onKey = (e) => { if (e.key === "Escape") setExpanded(false); };
		if (expanded) window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [expanded]);

	/* Shared inner content */
	const renderContent = (isFullscreen = false) => (
		<>
			<Desktop
				apps={APPS}
				onOpen={handleOpen}
				clickingAppId={clickingAppId}
				onExpand={isFullscreen ? () => setExpanded(false) : () => setExpanded(true)}
			/>
			<Dock apps={APPS} openId={openApp?.id} onOpen={handleOpen} />
			{openApp && (
				<AppWindow key={openApp.id} app={openApp} tabData={data[openApp.id]}
					onClose={handleClose} onAdd={addRow} onUpdate={updateRow} onDelete={deleteRow} />
			)}
			{locked && <LockScreen onUnlock={() => setLocked(false)} />}

			{/* Fullscreen toggle hint — shown after unlock */}
			{!locked && !openApp && (
				<div className="pointer-events-none absolute bottom-14 right-3 z-10 flex items-center gap-1 rounded-md bg-black/40 px-2 py-1 backdrop-blur-sm">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="h-2.5 w-2.5 opacity-60">
						<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
					</svg>
					<span className="text-[7px] font-medium text-white/60">
						{isFullscreen ? "Thu nhỏ" : "Mở rộng"}
					</span>
				</div>
			)}
		</>
	);

	return (
		<>
			{/* Normal 16/9 mockup */}
			<div
				data-mockup-root
				className="relative overflow-hidden rounded-2xl shadow-[0_24px_80px_-20px_rgba(0,0,0,0.55)] ring-[3px] ring-white/10"
				style={{ aspectRatio: "16/9" }}
			>
				{renderContent(false)}
			</div>

			{/* Fullscreen portal */}
			{expanded && createPortal(
				<>
					<style>{`
						@keyframes cam-backdrop {
							0%   { opacity: 0; }
							100% { opacity: 1; }
						}
						@keyframes cam-zoom {
							0%   { opacity: 0; transform: scale(0.12); filter: blur(12px); }
							45%  { opacity: 1; filter: blur(0); }
							68%  { transform: scale(1.04); }
							84%  { transform: scale(0.985); }
							100% { opacity: 1; transform: scale(1); filter: blur(0); }
						}
					`}</style>
					<div
						className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
						style={{
							backgroundColor: "rgba(0,0,0,0.88)",
							backdropFilter: "blur(24px)",
							WebkitBackdropFilter: "blur(24px)",
							animation: "cam-backdrop 0.35s ease forwards",
						}}
						onClick={(e) => { if (e.target === e.currentTarget) setExpanded(false); }}
					>
						{/* Close button */}
						<button
							onClick={() => setExpanded(false)}
							className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/25 hover:scale-110"
							title="Đóng (ESC)"
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
							</svg>
						</button>

						{/* Label */}
						<div className="absolute left-5 top-5 z-10 flex items-center gap-2">
							<span className="text-xs font-semibold text-white/50 uppercase tracking-widest">Chế độ trải nghiệm đầy đủ</span>
							<span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-white/40">ESC để thoát</span>
						</div>

						{/* Fullscreen mockup — camera zoom */}
						<div
							data-mockup-root
							className="relative w-full overflow-hidden rounded-2xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
							style={{
								aspectRatio: "16/9",
								maxHeight: "90vh",
								maxWidth: "calc(90vh * 16 / 9)",
								animation: "cam-zoom 0.52s cubic-bezier(0.22,1,0.36,1) forwards",
							}}
						>
							{renderContent(true)}
						</div>
					</div>
				</>,
				document.body
			)}
		</>
	);
}
