import { useState } from "react";
import useFadeUp from "../hooks/useFadeUp.js";

const SCALE_OPTIONS = [
	"Sinh viên",
	"Cá nhân",
	"Startup",
	"Đại lý bán lẻ",
	"Doanh nghiệp nhỏ (1 cơ sở)",
	"Doanh nghiệp vừa (trên 2 cơ sở)",
];

/* ── Minimal Apple-style field ── */
const Field = ({ label, error, children }) => (
	<div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
		<label style={{
			fontSize: 11,
			fontWeight: 600,
			letterSpacing: "0.08em",
			textTransform: "uppercase",
			color: "#86868b",
			fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
		}}>
			{label}
		</label>
		{children}
		{error && (
			<span style={{ fontSize: 11, color: "#d93025", marginTop: 2 }}>{error}</span>
		)}
	</div>
);

const inputStyle = (hasError, focused) => ({
	width: "100%",
	background: "transparent",
	border: "none",
	borderBottom: `1px solid ${hasError ? "#d93025" : focused ? "#1d1d1f" : "#d2d2d7"}`,
	borderRadius: 0,
	padding: "10px 0",
	fontSize: 15,
	color: "#1d1d1f",
	outline: "none",
	fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
	transition: "border-color 0.18s ease",
	boxSizing: "border-box",
});

const InputField = ({ type = "text", placeholder, value, onChange, hasError }) => {
	const [focused, setFocused] = useState(false);
	return (
		<input
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			style={inputStyle(hasError, focused)}
		/>
	);
};

const SelectField = ({ value, onChange, hasError }) => {
	const [focused, setFocused] = useState(false);
	return (
		<select
			value={value}
			onChange={onChange}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			style={{ ...inputStyle(hasError, focused), cursor: "pointer", appearance: "none", WebkitAppearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2386868b' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 4px center", paddingRight: 24 }}
		>
			<option value="">Chọn quy mô</option>
			{SCALE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
		</select>
	);
};

const TextareaField = ({ placeholder, value, onChange }) => {
	const [focused, setFocused] = useState(false);
	return (
		<textarea
			rows={3}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			style={{ ...inputStyle(false, focused), resize: "none", lineHeight: 1.6 }}
		/>
	);
};

const audiences = [
	"Sinh viên khởi nghiệp", "Freelancer & cá nhân",
	"Đại lý & shop nhỏ", "Doanh nghiệp SME",
	"Tiệm spa / nail", "Shop tài khoản",
];

const CTASection = () => {
	const fade = useFadeUp();
	const [form, setForm] = useState({ name: "", phone: "", scale: "", note: "" });
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [errors, setErrors] = useState({});

	const set = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

	const validate = () => {
		const e = {};
		if (!form.name.trim()) e.name = "Vui lòng nhập tên";
		if (!form.phone.trim()) e.phone = "Vui lòng nhập số điện thoại";
		else if (!/^(0|\+84)[0-9]{8,10}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Số không hợp lệ";
		if (!form.scale) e.scale = "Vui lòng chọn quy mô";
		return e;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errs = validate();
		if (Object.keys(errs).length) { setErrors(errs); return; }
		setErrors({});
		setLoading(true);
		setTimeout(() => { setLoading(false); setSubmitted(true); }, 900);
	};

	const font = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

	return (
		<section id="cta" style={{ padding: "80px 0 96px", fontFamily: font }}>
			<div ref={fade.ref} className={fade.className} style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>

				{/* ── Header ── */}
				<div style={{ textAlign: "center", marginBottom: 56 }}>
					<p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0071e3", marginBottom: 14 }}>
						Bắt đầu ngay hôm nay
					</p>
					<h2 style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, color: "#1d1d1f", margin: "0 0 16px" }}>
						Dù quy mô nào,<br />
						<span style={{ color: "#0071e3" }}>chúng tôi có giải pháp.</span>
					</h2>
					<p style={{ fontSize: 17, lineHeight: 1.6, color: "#6e6e73", maxWidth: 480, margin: "0 auto" }}>
						Tư vấn hoàn toàn miễn phí, không ràng buộc, giá minh bạch từ đầu.
					</p>
				</div>

				{/* ── Form + Side info ── */}
				<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start", maxWidth: 880, margin: "0 auto" }}
					className="cta-grid"
				>
					{/* Left — Form */}
					<div style={{ maxWidth: 480 }}>
						{submitted ? (
							<div style={{ padding: "48px 0", textAlign: "center" }}>
								<div style={{ width: 48, height: 48, borderRadius: "50%", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
									<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2">
										<path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
									</svg>
								</div>
								<p style={{ fontSize: 19, fontWeight: 600, color: "#1d1d1f", marginBottom: 10 }}>Đã nhận thông tin!</p>
								<p style={{ fontSize: 15, color: "#6e6e73", lineHeight: 1.6 }}>
									Chúng tôi sẽ liên hệ với bạn sớm nhất — thường trong <strong style={{ color: "#1d1d1f" }}>30 phút</strong> trong giờ làm việc.
								</p>
								<button
									onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", scale: "", note: "" }); }}
									style={{ marginTop: 24, fontSize: 14, color: "#0071e3", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}
								>
									Gửi thêm yêu cầu
								</button>
							</div>
						) : (
							<form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 28 }}>
								<Field label="Họ & Tên" error={errors.name}>
									<InputField placeholder="Nguyễn Văn A" value={form.name} onChange={set("name")} hasError={!!errors.name} />
								</Field>

								<Field label="Số điện thoại" error={errors.phone}>
									<InputField type="tel" placeholder="0901 234 567" value={form.phone} onChange={set("phone")} hasError={!!errors.phone} />
								</Field>

								<Field label="Quy mô" error={errors.scale}>
									<SelectField value={form.scale} onChange={set("scale")} hasError={!!errors.scale} />
								</Field>

								<Field label={<>Đặc tả nhu cầu <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "#b0b0b5" }}>· tuỳ chọn</span></>}>
									<TextareaField placeholder="Mô tả ngắn về tính năng bạn cần…" value={form.note} onChange={set("note")} />
								</Field>

								<button
									type="submit"
									disabled={loading}
									style={{
										marginTop: 4,
										width: "100%",
										padding: "14px 0",
										background: loading ? "#6e6e73" : "#0071e3",
										color: "#fff",
										border: "none",
										borderRadius: 8,
										fontSize: 15,
										fontWeight: 500,
										cursor: loading ? "not-allowed" : "pointer",
										fontFamily: font,
										transition: "opacity 0.15s ease, background 0.15s ease",
										opacity: loading ? 0.75 : 1,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: 8,
									}}
									onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.85"; }}
									onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
								>
									{loading ? (
										<>
											<svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
												<path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z" />
											</svg>
											Đang gửi…
										</>
									) : "Gửi yêu cầu tư vấn"}
								</button>
							</form>
						)}
					</div>

					{/* Right — Info */}
					<div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 36 }}>
						{[
							{ label: "Tư vấn miễn phí", sub: "Không mất phí khảo sát, không ràng buộc." },
							{ label: "Giá minh bạch", sub: "Báo giá trọn gói trước khi ký hợp đồng." },
							{ label: "Hỗ trợ lâu dài", sub: "Bảo trì sau bàn giao, đồng hành dài lâu." },
						].map(({ label, sub }) => (
							<div key={label}>
								<p style={{ fontSize: 15, fontWeight: 600, color: "#1d1d1f", marginBottom: 4 }}>{label}</p>
								<p style={{ fontSize: 14, color: "#6e6e73", lineHeight: 1.6, margin: 0 }}>{sub}</p>
							</div>
						))}

						{/* Hotline */}
						<div style={{ paddingTop: 16, borderTop: "1px solid #f2f2f2" }}>
							<p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#86868b", marginBottom: 6 }}>Hotline tư vấn</p>
							<a href="tel:+84901234567" style={{ fontSize: 22, fontWeight: 600, color: "#1d1d1f", textDecoration: "none", letterSpacing: "-0.01em" }}>
								0901 234 567
							</a>
							<p style={{ fontSize: 12, color: "#86868b", marginTop: 4 }}>Thứ 2 – Thứ 7 · 8:00 – 18:00</p>
						</div>
					</div>
				</div>

				{/* ── Audience chips ── */}
				<div style={{ marginTop: 72, textAlign: "center" }}>
					<p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#86868b", marginBottom: 20 }}>
						Phục vụ mọi đối tượng
					</p>
					<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
						{audiences.map(a => (
							<span key={a} style={{ padding: "6px 16px", borderRadius: 999, background: "#f5f5f7", fontSize: 13, color: "#6e6e73", fontWeight: 500 }}>{a}</span>
						))}
					</div>
				</div>
			</div>

			{/* Responsive grid style */}
			<style>{`
				@media (max-width: 680px) {
					.cta-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
				}
			`}</style>
		</section>
	);
};

export default CTASection;
