/* eslint-disable react/jsx-key */

import React from 'react';
import Container from '../../components/panel/Container';
import TablePagination from '../../components/panel/TablePagination';

import { PencilSquareIcon, NoSymbolIcon, BeakerIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

import { Button } from '../../components/shared/buttons';
import { UserAvatarCell, DateCell, UserStatusCell, RoleCell } from '../../components/shared/cells';

import { createModal } from '../../utils/sweetalert2';

const Users = () => {
  return (
    <>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Users</p>
      <Container>
        <TablePagination
          url={'/api/user/v1/list-all'}
          columns={[
            {
              Header: 'ID',
              accessor: 'id',
            },
            {
              Header: 'Name',
              accessor: 'name',
              Cell: UserAvatarCell,
            },
            {
              Header: 'Username',
              accessor: 'username',
            },
            {
              Header: 'Role',
              accessor: 'role',
              Cell: RoleCell,
            },
            {
              Header: 'Created',
              accessor: 'created_at',
              Cell: DateCell,
            },
            {
              Header: 'Activity',
              accessor: 'activity_at',
              Cell: DateCell,
            },
            {
              Header: 'Status',
              accessor: 'status',
              Cell: UserStatusCell,
            },
          ]}
          extraButton={[
            <Button
              className={
                'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
              }
            >
              Add User
            </Button>,
          ]}
          action={({ row }) => {
            const { id, is_block, activity_at } = row.original;
            return (
              <>
                <div className="tooltip">
                  <Button
                    data-tooltip-target={'tooltip-edit'}
                    onClick={() => {
                      console.log({ id });
                    }}
                  >
                    <PencilSquareIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Button>
                  <span className="tooltiptext">Edit</span>
                </div>
                {!is_block ? (
                  <>
                    {activity_at ? (
                      <div className="tooltip">
                        <Button
                          onClick={() => {
                            console.log({ id });
                          }}
                        >
                          <ArrowLeftOnRectangleIcon className="h-5 w-5 text-yellow-600" aria-hidden="true" />
                        </Button>
                        <span className="tooltiptext">Force Logout!</span>
                      </div>
                    ) : null}
                    <div className="tooltip">
                      <Button
                        onClick={() => {
                          console.log({ id });
                        }}
                      >
                        <NoSymbolIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
                      </Button>
                      <span className="tooltiptext">Block!</span>
                    </div>
                  </>
                ) : (
                  <div className="tooltip">
                    <Button
                      onClick={() => {
                        console.log({ id });
                      }}
                    >
                      <BeakerIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                    </Button>
                    <span className="tooltiptext">Heal!</span>
                  </div>
                )}
              </>
            );
          }}
        />
      </Container>
    </>
  );
};

export default Users;
