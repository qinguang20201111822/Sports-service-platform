<div id="right">
        <div class="classList">
            <div class="title">版块列表</div>
            <ul class="listWrap">
                <li>
                    <?php
                    $query = "select * from qg_father_module order by sort desc";
                    $result_father = execute($link, $query);
                    while ($data_father = mysqli_fetch_assoc($result_father)) {
                    ?>
                        <h2><a href="list_father.php?id=<?php echo $data_father['id'] ?>"><?php echo $data_father['module_name'] ?></a></h2>
                        <?php
                        $query = "select * from qg_son_module where father_module_id={$data_father['id']}";
                        $result_son = execute($link, $query);
                        while ($data_son = mysqli_fetch_assoc($result_son)) {
                        ?>
                            <ul>
                                <li>
                                    <h3><a href="list_son.php?id=<?php echo $data_son['id'] ?>"><?php echo $data_son['module_name'] ?></a></h3>
                                </li>
                            </ul>
                        <?php } ?>
                    <?php } ?>
                </li>


            </ul>
        </div>
    </div>
    <div style="clear:both;"></div>