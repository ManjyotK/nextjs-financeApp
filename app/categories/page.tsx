import { getCategories } from "../lib/data";
import CategoryTable from "../ui/categoryTable";

export default async function Page(){
    const categories = await getCategories();
    return (
        <div>            
            <CategoryTable categories={categories} />
        </div>
    );
}
