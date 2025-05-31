export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} College Compass. All rights reserved.</p>
        <p className="text-sm mt-1">Your guide to higher education in India.</p>
      </div>
    </footer>
  );
}
