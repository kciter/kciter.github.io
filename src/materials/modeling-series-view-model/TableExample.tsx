import React, { useState, useEffect } from 'react';
import TableRenderer from './TableRenderer';

// 샘플 데이터
const sampleData = [
  {
    id: 1,
    name: '홍길동',
    email: 'hong@example.com',
    joinDate: '2023-01-15',
    point: 3500
  },
  {
    id: 2,
    name: '김영희',
    email: 'kim@example.com',
    joinDate: '2023-02-20',
    point: 4200
  },
  {
    id: 3,
    name: '이철수',
    email: 'lee@example.com',
    joinDate: '2023-03-05',
    point: 2800
  },
  {
    id: 4,
    name: '박지민',
    email: 'park@example.com',
    joinDate: '2023-04-10',
    point: 5100
  },
  {
    id: 5,
    name: '최민지',
    email: 'choi@example.com',
    joinDate: '2023-05-18',
    point: 1900
  },
  {
    id: 6,
    name: '정다희',
    email: 'jung@example.com',
    joinDate: '2023-06-22',
    point: 3200
  },
  {
    id: 7,
    name: '강현우',
    email: 'kang@example.com',
    joinDate: '2023-07-09',
    point: 4600
  },
  {
    id: 8,
    name: '윤서연',
    email: 'yoon@example.com',
    joinDate: '2023-08-14',
    point: 2100
  },
  {
    id: 9,
    name: '서민석',
    email: 'seo@example.com',
    joinDate: '2023-09-30',
    point: 3800
  },
  {
    id: 10,
    name: '임수진',
    email: 'lim@example.com',
    joinDate: '2023-10-05',
    point: 5300
  },
  {
    id: 11,
    name: '오준호',
    email: 'oh@example.com',
    joinDate: '2023-11-11',
    point: 2700
  },
  {
    id: 12,
    name: '한지은',
    email: 'han@example.com',
    joinDate: '2023-12-20',
    point: 4100
  }
];

// 예제 API 호출 함수
const fetchTableData = async (params: any) => {
  // 실제로는 API 호출
  console.log('Fetching data with params:', params);

  // 페이지네이션 적용
  const pageSize = params.pageSize || 5;
  const page = params.page || 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // 정렬 적용
  let filteredData = [...sampleData];

  if (params.sortBy) {
    filteredData.sort((a, b) => {
      const valueA = (a as any)[params.sortBy];
      const valueB = (b as any)[params.sortBy];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return params.sortDirection === 'ASC'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return params.sortDirection === 'ASC' ? valueA - valueB : valueB - valueA;
      }
    });
  }

  // 필터링 적용
  if (params.filter && params.filterValue) {
    filteredData = filteredData.filter(item => {
      const value = (item as any)[params.filter];

      if (typeof value === 'string') {
        return value.toLowerCase().includes(params.filterValue.toLowerCase());
      } else if (typeof value === 'number') {
        return value === Number(params.filterValue);
      }

      return false;
    });
  }

  // 페이지네이션을 위한 데이터 슬라이싱
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // 테이블 행 형식으로 변환
  const rows = paginatedData.map(item => ({
    cells: [
      { columnId: 'id', value: item.id },
      { columnId: 'name', value: item.name },
      { columnId: 'email', value: item.email },
      { columnId: 'joinDate', value: item.joinDate },
      { columnId: 'point', value: item.point }
    ]
  }));

  // 필터링 적용된 전체 아이템 수
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // 백엔드에서 받은 JSON을 모방
  return {
    columns: [
      { id: 'id', label: 'ID', type: 'NUMBER', align: 'CENTER', sortable: true },
      { id: 'name', label: '이름', type: 'TEXT', align: 'LEFT', sortable: true },
      { id: 'email', label: '이메일', type: 'TEXT', align: 'LEFT', sortable: false },
      { id: 'joinDate', label: '가입일', type: 'DATE', align: 'CENTER', sortable: true },
      { id: 'point', label: '포인트', type: 'NUMBER', align: 'RIGHT', sortable: true }
    ],
    rows: rows,
    sortable: true,
    pagination: {
      page: page,
      totalPage: totalPages,
      pageSize: pageSize
    },
    state: {
      sorting: params.sortBy
        ? [
            {
              columnId: params.sortBy,
              direction: params.sortDirection || 'ASC'
            }
          ]
        : [],
      filters: params.filter
        ? [
            {
              columnId: params.filter,
              type: 'LIKE',
              value: params.filterValue
            }
          ]
        : null
    }
  };
};

export function TableExample() {
  // 상태 관리
  const [viewModel, setViewModel] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 5,
    sortBy: '',
    sortDirection: 'ASC' as 'ASC' | 'DESC',
    filter: '',
    filterValue: ''
  });

  // 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // 실제 API 호출 시 지연 시간 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 500));

        const data = await fetchTableData(params);
        setViewModel(data);
      } catch (error) {
        console.error('Error loading table data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params]);

  // 정렬 변경 처리
  const handleSortChange = (sortInfo: any) => {
    setParams({
      ...params,
      sortBy: sortInfo.columnId,
      sortDirection: sortInfo.direction
    });
  };

  // 페이지 변경 처리
  const handlePageChange = (page: number) => {
    setParams({
      ...params,
      page
    });
  };

  // 행 클릭 처리
  const handleRowClick = (row: any) => {
    // 행 클릭 시 ID 찾기
    const idCell = row.cells.find((cell: any) => cell.columnId === 'id');
    if (idCell) {
      alert(`${idCell.value}번 행을 클릭했습니다.`);
    }
  };

  // 페이지 크기 변경 처리
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(e.target.value);
    setParams({
      ...params,
      page: 1, // 페이지 크기 변경 시 첫 페이지로 이동
      pageSize: newPageSize
    });
  };

  // 필터 변경 처리
  const handleFilterChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const filterColumn = formData.get('filterColumn') as string;
    const filterValue = formData.get('filterValue') as string;

    setParams({
      ...params,
      page: 1, // 필터 변경 시 첫 페이지로 이동
      filter: filterColumn,
      filterValue: filterValue
    });
  };

  // 필터 초기화
  const handleResetFilter = () => {
    setParams({
      ...params,
      page: 1,
      filter: '',
      filterValue: ''
    });

    // 폼 초기화
    const filterForm = document.getElementById('filterForm') as HTMLFormElement;
    if (filterForm) {
      filterForm.reset();
    }
  };

  if (!viewModel) {
    return <div className="loading-container">로딩 중...</div>;
  }

  return (
    <div
      style={{
        paddingTop: '16px',
        paddingBottom: '16px',
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc'
      }}
    >
      <div className="controls-container">
        <div className="filter-container">
          <form id="filterForm" onSubmit={handleFilterChange}>
            <select name="filterColumn" className="filter-select">
              <option value="">필터 컬럼 선택</option>
              <option value="name">이름</option>
              <option value="email">이메일</option>
            </select>

            <input
              type="text"
              name="filterValue"
              placeholder="필터 값 입력"
              className="filter-input"
            />

            <button type="submit" className="filter-button">
              필터 적용
            </button>

            <button type="button" className="filter-reset-button" onClick={handleResetFilter}>
              필터 초기화
            </button>
          </form>
        </div>

        <div className="page-size-container">
          <label htmlFor="pageSize">페이지 크기:</label>
          <select
            id="pageSize"
            value={params.pageSize}
            onChange={handlePageSizeChange}
            className="page-size-select"
          >
            <option value="3">3개씩</option>
            <option value="5">5개씩</option>
            <option value="10">10개씩</option>
          </select>
        </div>
      </div>

      <TableRenderer
        viewModel={viewModel}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
        loading={loading}
      />

      <div className="api-params">
        <h3>현재 API 파라미터:</h3>
        <pre>{JSON.stringify(params, null, 2)}</pre>
      </div>
    </div>
  );
}
