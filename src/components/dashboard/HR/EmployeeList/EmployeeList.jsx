import { useContext, useEffect, useState, useCallback } from 'react';
import useAxiosSecure from './../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [currentLimit, setCurrentLimit] = useState(0);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const hrEmail = user?.email;

  const fetchEmployeesAndLimit = useCallback(async () => {
    if (!hrEmail) return;

    try {
      setLoading(true);

      // get limit from database
      const userRes = await axiosSecure.get(`/user/${hrEmail}`);
      const dbLimit = Number(userRes.data?.packageLimit || 5);
      setCurrentLimit(dbLimit);

      // for employee list
      const res = await axiosSecure.get(`/employees/${hrEmail}`);
      const empList = res.data || [];

      // for asset count
      const empWithAssets = await Promise.all(
        empList.map(async emp => {
          let assetsCount = 0;
          try {
            const assignedRes = await axiosSecure.get(
              `/assigned-assets/${emp.employeeEmail}`
            );
            assetsCount = Array.isArray(assignedRes.data)
              ? assignedRes.data.length
              : 0;
          } catch (err) {
            console.error(`Error for ${emp.employeeEmail}:`, err);
          }
          return { ...emp, assetsCount };
        })
      );

      setEmployees(empWithAssets);
    } catch (err) {
      console.error('Data fetching error:', err);
    } finally {
      setLoading(false);
    }
  }, [hrEmail, axiosSecure]);

  //
 useEffect(() => {
   let isMounted = true; 

   if (hrEmail && isMounted) {
     fetchEmployeesAndLimit();
   }

   return () => {
     isMounted = false;
   };
 }, [hrEmail]);

  const handleRemove = async affiliationId => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This employee will be removed from your company!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove them!',
      background: '#1a1a2e',
      color: '#fff',
    });

    if (!result.isConfirmed) return;

    setRemovingId(affiliationId);
    try {
      await axiosSecure.delete(`/employee/${affiliationId}`);
      Swal.fire({
        title: 'Removed!',
        text: 'Employee has been removed.',
        icon: 'success',
        background: '#1a1a2e',
        color: '#fff',
      });
      // refresh after remove
      fetchEmployeesAndLimit();
    } catch (err) {
      Swal.fire('Error', 'Failed to remove employee', 'error');
    } finally {
      setRemovingId(null);
    }
  };

  if (loading || !hrEmail)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-ring loading-xl text-purple-500"></span>
      </div>
    );

  return (
    <div className="p-6 bg-[#1a1a2e] text-gray-100 rounded-xl shadow-2xl mt-6 border border-purple-900/20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            My Employees
          </h2>
          <p className="text-purple-400 font-medium mt-1">
            Team Capacity:{' '}
            <span className="text-white">{employees?.length}</span> /{' '}
            {currentLimit}
          </p>
        </div>
        <div
          className="radial-progress text-purple-500 bg-purple-900/10"
          style={{
            '--value':
              currentLimit > 0 ? (employees.length / currentLimit) * 100 : 0,
            '--size': '4rem',
            '--thickness': '4px',
          }}
        >
          <span className="text-xs text-white font-bold">
            {Math.round((employees?.length / currentLimit) * 100)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {employees.length === 0 ? (
          <div className="text-center col-span-2 py-20 bg-[#161625] rounded-2xl border border-dashed border-purple-900/30">
            <p className="text-gray-500 italic text-lg">
              No employees found in your team.
            </p>
          </div>
        ) : (
          employees.map(emp => (
            <div
              key={emp._id}
              className="flex items-center justify-between bg-[#161625] p-5 rounded-2xl border border-purple-900/10 hover:border-purple-500/30 transition-all duration-300 group shadow-lg"
            >
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img
                    src={
                      emp.employee?.profileImage ||
                      'https://i.ibb.co/5GzXkwq/user.png'
                    }
                    alt={emp.employeeName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500/20 group-hover:border-purple-500/50 transition-all"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#161625] rounded-full"></div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                    {emp.employeeName || emp.employee?.name || 'Unknown'}
                  </h3>
                  <p className="text-sm text-gray-400 truncate max-w-[150px] md:max-w-xs">
                    {emp.employeeEmail}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="badge badge-sm bg-purple-900/40 text-purple-300 border border-purple-500/20 p-2">
                      Assets: {emp.assetsCount || 0}
                    </span>
                    <span className="text-[11px] text-gray-500 mt-1">
                      Joined:{' '}
                      {emp.affiliationDate
                        ? new Date(emp.affiliationDate).toLocaleDateString()
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRemove(emp._id)}
                disabled={removingId === emp._id}
                className="btn btn-circle btn-ghost text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all"
                title="Remove Employee"
              >
                {removingId === emp._id ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
