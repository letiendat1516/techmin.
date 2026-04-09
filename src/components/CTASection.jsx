import useFadeUp from "../hooks/useFadeUp.js";

const promises = [
	{ label: "Tư vấn miễn phí", sub: "Không mất phí khảo sát" },
	{ label: "Giá minh bạch", sub: "Báo giá trọn gói từ đầu" },
	{ label: "Hỗ trợ lâu dài", sub: "Bảo trì sau khi triển khai" },
];

const audiences = [
	"Sinh viên khởi nghiệp",
	"Freelancer & cá nhân",
	"Đại lý & shop nhỏ",
	"Doanh nghiệp SME",
	"Tiệm spa / nail",
	"Shop tài khoản",
];

const CTASection = () => {
	const fade = useFadeUp();

	return (
		<section id="cta" className="py-14 md:py-20">
			<div
				ref={fade.ref}
				className={`mx-auto max-w-4xl px-6 ${fade.className}`}
			>
				{/* Eyebrow */}
				<p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-apple-blue">
					Bắt đầu ngay hôm nay
				</p>

				{/* Main headline — Apple punchy style */}
				<div className="text-center">
					<h2 className="font-display text-section text-apple-gray-1">
						Dù quy mô nào,{" "}
						<br className="hidden sm:block" />
						<span style={{
							background: "linear-gradient(to right, #0071e3, #5856d6)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
						}}>
							chúng tôi có giải pháp.
						</span>
					</h2>

					<p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-apple-gray-2">
						Từ sinh viên với ý tưởng đầu tiên đến đại lý SME cần hệ thống chuyên
						sâu —{" "}
						<strong className="font-semibold text-apple-gray-1">
						 tư vấn hoàn toàn miễn phí
						</strong>
						, không ràng buộc, giá{" "}
						<strong className="font-semibold text-apple-gray-1">
							minh bạch từ đầu
						</strong>
						.
					</p>
				</div>

				{/* 3 key promises — pill row */}
				<div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3">
					{promises.map((p) => (
						<div
							key={p.label}
							className="flex items-center gap-2.5 rounded-full border border-apple-gray-4/60 bg-white px-5 py-2.5 shadow-sm"
						>
							<span className="h-1.5 w-1.5 rounded-full bg-apple-blue" />
							<span className="text-sm font-semibold text-apple-gray-1">
								{p.label}
							</span>
							<span className="hidden text-[12px] text-apple-gray-3 sm:block">
								— {p.sub}
							</span>
						</div>
					))}
				</div>

				{/* CTA buttons */}
				<div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
					<a
						href="tel:+84123456789"
						className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
						style={{ backgroundColor: "#0071e3", color: "#ffffff" }}
					>
						Gọi tư vấn miễn phí
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="h-4 w-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
							/>
						</svg>
					</a>
					<a
						href="https://zalo.me/0123456789"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-full border border-apple-gray-4/60 bg-white px-8 py-3.5 text-sm font-semibold text-apple-gray-1 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
					>
						Nhắn qua Zalo
					</a>
				</div>

				{/* Divider */}
				<div className="mx-auto mt-10 flex items-center gap-4">
					<div className="h-px flex-1 bg-apple-gray-4/40" />
					<p className="text-[11px] font-medium uppercase tracking-wider text-apple-gray-3">
						Phục vụ mọi đối tượng
					</p>
					<div className="h-px flex-1 bg-apple-gray-4/40" />
				</div>

				{/* Audience chips */}
				<div className="mt-5 flex flex-wrap items-center justify-center gap-2">
					{audiences.map((a) => (
						<span
							key={a}
							className="rounded-full bg-apple-gray-5 px-3.5 py-1.5 text-[12px] font-medium text-apple-gray-2"
						>
							{a}
						</span>
					))}
				</div>
			</div>
		</section>
	);
};

export default CTASection;
