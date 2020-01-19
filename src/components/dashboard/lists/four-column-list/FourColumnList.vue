<script src="./four-column-list.ts" lang="ts"></script>
<style src="./four-column-list.scss" lang="scss" scoped></style>

<template>
	<div id="four-column-list">
		<pre>{{ data }}</pre>

		{{ data.name }}
		{{ getValueFromType(data) }}
		{{ data.paid_date }}
		{{ data.amount }}
	</div>
</template>
