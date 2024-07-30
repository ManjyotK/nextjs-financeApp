import { getCategories } from "../lib/data";
import CategoryTable from "../ui/categoryTable";
export const dynamic = "force-dynamic";


/**
 * Renders the Categories page with a table of categories fetched from the database.
 *
 * @returns {Promise<JSX.Element>} The Categories page.
 */
export default async function CategoriesPage() {
  // Fetch the list of categories from the database
  const fetchedCategories = await getCategories();

  // Render the CategoryTable component with the fetched categories
  return (
    <div>
      <CategoryTable categories={fetchedCategories} />
    </div>
  );
}
