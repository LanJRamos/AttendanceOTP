import { Table } from "flowbite-react"

const ConflictTable = () => {
    return(
        <Table hoverable>
            <Table.Head className="p-4">
                <Table.HeadCell>Shift Dates</Table.HeadCell>
                <Table.HeadCell>isWork</Table.HeadCell>
                <Table.HeadCell>Leaves</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        29/11/2023
                    </Table.Cell>
                    <Table.Cell>true</Table.Cell>
                    <Table.Cell>notLeave</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )
}

export default ConflictTable