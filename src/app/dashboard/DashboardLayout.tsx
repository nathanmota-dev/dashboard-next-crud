import Sidebar from '../../components/Sidebar';
import Header from '../components/Header';

interface DashboardLayoutProps {
    title: string;
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title, children }) => {
    return (
        <div className="h-full flex">
            <Sidebar />
            <div className="flex-1 relative">
                <Header title={title} />
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
