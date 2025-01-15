

export default function TodosLayout({ children, }: { children: React.ReactNode; }) {

	return (
		<section className="flex justify-center">
			{children}
		</section>
	);
}
