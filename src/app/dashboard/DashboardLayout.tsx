import Sidebar from '../../components/Sidebar';
import { ModeToggle } from '../components/mode-toogle/index';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="h-full flex">
            <Sidebar />
            <div className="flex-1 relative">
                <div className="absolute right-4 top-4">
                    <ModeToggle />
                </div>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
